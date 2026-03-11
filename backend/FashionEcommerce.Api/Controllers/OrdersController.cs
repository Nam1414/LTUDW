using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Api.Data;
using FashionEcommerce.Api.Models;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;
    private const decimal SHIPPING_FEE = 30000m;

    public OrdersController(AppDbContext context) => _context = context;

    // POST /api/orders (tạo order từ cart)
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
    {
        var userIdString = User.FindFirst("id")?.Value;
        if (string.IsNullOrEmpty(userIdString)) return Unauthorized();
        var userId = int.Parse(userIdString);

        // Lấy cart items
        var cartItems = await _context.CartItems
            .Include(ci => ci.Product)
            .Where(ci => ci.UserId == userId)
            .ToListAsync();

        if (!cartItems.Any()) return BadRequest("Cart is empty");

        // Validate stock
        foreach (var item in cartItems)
        {
            if (item.Product.Stock < item.Quantity)
                return BadRequest($"Product {item.Product.Name} insufficient stock");
        }

        // Tính tiền
        var totalAmount = cartItems.Sum(ci => ci.Quantity * ci.UnitPriceSnapshot);
        var discountAmount = dto.DiscountAmount ?? 0;
        var finalAmount = totalAmount - discountAmount + SHIPPING_FEE;

        // Tạo Order
        var order = new Order
        {
            UserId = userId,
            Status = "Pending",
            TotalAmount = totalAmount,
            DiscountAmount = discountAmount,
            ShippingFee = SHIPPING_FEE,
            FinalAmount = finalAmount,
            ShippingAddress = dto.ShippingAddress,
            CreatedAt = DateTime.UtcNow,
            OrderDetails = cartItems.Select(ci => new OrderDetail
            {
                ProductId = ci.ProductId,
                Quantity = ci.Quantity,
                UnitPrice = ci.UnitPriceSnapshot,
                LineTotal = ci.Quantity * ci.UnitPriceSnapshot
            }).ToList()
        };

        // Giảm stock
        foreach (var item in cartItems)
            item.Product.Stock -= item.Quantity;

        _context.Orders.Add(order);

        // Clear cart
        _context.CartItems.RemoveRange(cartItems);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            orderId = order.Id,
            status = order.Status,
            totalAmount = order.TotalAmount,
            discountAmount = order.DiscountAmount,
            shippingFee = order.ShippingFee,
            finalAmount = order.FinalAmount,
            shippingAddress = order.ShippingAddress,
            itemCount = order.OrderDetails.Count,
            createdAt = order.CreatedAt
        });
    }

    // GET /api/orders (user lấy đơn của mình)
    [HttpGet]
    public async Task<IActionResult> GetMyOrders()
    {
        var userIdString = User.FindFirst("id")?.Value;
        if (string.IsNullOrEmpty(userIdString)) return Unauthorized();
        var userId = int.Parse(userIdString);

        var orders = await _context.Orders
            .Where(o => o.UserId == userId)
            .Select(o => new
            {
                o.Id,
                o.Status,
                o.TotalAmount,
                o.DiscountAmount,
                o.ShippingFee,
                o.FinalAmount,
                o.ShippingAddress,
                o.CreatedAt,
                ItemCount = o.OrderDetails.Count
            })
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        return Ok(orders);
    }

    // GET /api/orders/{id} (user xem chi tiết đơn)
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderDetail(int id)
    {
        var userIdString = User.FindFirst("id")?.Value;
        if (string.IsNullOrEmpty(userIdString)) return Unauthorized();
        var userId = int.Parse(userIdString);

        var order = await _context.Orders
            .Include(o => o.OrderDetails).ThenInclude(od => od.Product)
            .Include(o => o.StatusHistories)
            .FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);

        if (order == null) return NotFound("Order not found");

        return Ok(new
        {
            order.Id,
            order.Status,
            order.TotalAmount,
            order.DiscountAmount,
            order.ShippingFee,
            order.FinalAmount,
            order.ShippingAddress,
            order.CreatedAt,
            Items = order.OrderDetails.Select(od => new
            {
                od.Id,
                ProductName = od.Product.Name,
                od.Quantity,
                od.UnitPrice,
                od.LineTotal
            }),
            StatusHistory = order.StatusHistories
                .OrderByDescending(h => h.ChangedAt)
                .Select(h => new { h.OldStatus, h.NewStatus, h.Note, h.ChangedAt })
        });
    }
}

public class CreateOrderDto
{
    public string ShippingAddress { get; set; } = string.Empty;
    public decimal? DiscountAmount { get; set; } = 0;
}
