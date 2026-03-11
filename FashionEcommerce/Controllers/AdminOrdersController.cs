using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Data;
using FashionEcommerce.Models;
using FashionEcommerce.Models.Entities;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("api/admin/orders")]
public class AdminOrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    // VALID STATUS TRANSITIONS
    private static readonly Dictionary<string, List<string>> _validTransitions = new()
    {
        { "Pending",   new() { "Paid", "Cancelled" } },
        { "Paid",      new() { "Shipping", "Cancelled" } },
        { "Shipping",  new() { "Completed" } },
        { "Completed", new() { } },   // Terminal
        { "Cancelled", new() { } }    // Terminal
    };

    public AdminOrdersController(AppDbContext context) => _context = context;

    // GET /api/admin/orders (all orders, filter by status)
    [HttpGet]
    public async Task<IActionResult> GetAllOrders([FromQuery] string? status, [FromQuery] int page = 1, int pageSize = 10)
    {
        var query = _context.Orders
            .Include(o => o.User)
            .AsQueryable();

        if (!string.IsNullOrEmpty(status))
            query = query.Where(o => o.Status == status);

        var orders = await query
            .OrderByDescending(o => o.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(o => new
            {
                o.Id,
                CustomerEmail = o.User.Email,
                CustomerName = o.User.FullName,
                o.Status,
                o.FinalAmount,
                o.ShippingAddress,
                o.CreatedAt,
                ItemCount = o.OrderDetails.Count
            })
            .ToListAsync();

        var total = await query.CountAsync();
        return Ok(new { orders, total, page, pageSize });
    }

    // PUT /api/admin/orders/{id}/status (update status + history)
    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusDto dto)
    {
        var adminIdString = User.FindFirst("id")?.Value;
        if (string.IsNullOrEmpty(adminIdString)) return Unauthorized();
        var adminId = int.Parse(adminIdString);

        var order = await _context.Orders.FindAsync(id);
        if (order == null) return NotFound("Order not found");

        // Validate transition
        if (!_validTransitions.ContainsKey(order.Status) ||
            !_validTransitions[order.Status].Contains(dto.NewStatus))
        {
            return BadRequest($"Cannot transition from '{order.Status}' to '{dto.NewStatus}'");
        }

        var oldStatus = order.Status;

        // Update order status
        order.Status = dto.NewStatus;
        order.UpdatedBy = adminId;

        // Log history
        _context.OrderStatusHistories.Add(new OrderStatusHistory
        {
            OrderId = order.Id,
            OldStatus = oldStatus,
            NewStatus = dto.NewStatus,
            Note = dto.Note ?? string.Empty,
            ChangedBy = adminId,
            ChangedAt = DateTime.UtcNow
        });

        // Tạo notification cho customer
        var notification = new Notification
        {
            UserId = order.UserId,
            Title = $"Đơn hàng #{order.Id} đã thay đổi trạng thái",
            Content = $"Đơn hàng #{order.Id} chuyển từ '{oldStatus}' sang '{dto.NewStatus}'. {dto.Note ?? ""}",
            Type = "OrderStatusChanged",
            ReferenceId = order.Id,
            CreatedAt = DateTime.UtcNow
        };
        _context.Notifications.Add(notification);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            orderId = order.Id,
            oldStatus,
            newStatus = order.Status,
            note = dto.Note,
            changedBy = adminId,
            changedAt = DateTime.UtcNow
        });
    }
}

public class UpdateStatusDto
{
    public string NewStatus { get; set; } = string.Empty;
    public string? Note { get; set; }
}
