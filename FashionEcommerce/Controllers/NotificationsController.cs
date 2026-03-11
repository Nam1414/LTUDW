using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Data;
using FashionEcommerce.Models;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class NotificationsController : ControllerBase
{
    private readonly AppDbContext _context;
    public NotificationsController(AppDbContext context) => _context = context;

    [HttpGet]
    public async Task<IActionResult> GetMyNotifications([FromQuery] int page = 1, int pageSize = 10)
    {
        var userIdString = User.FindFirst("id")?.Value;
        if (string.IsNullOrEmpty(userIdString)) return Unauthorized();
        var userId = int.Parse(userIdString);

        var query = _context.Notifications
            .Where(n => n.UserId == userId)
            .OrderByDescending(n => n.CreatedAt);

        var total = await query.CountAsync();
        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(n => new
            {
                n.Id,
                n.Title,
                n.Content,
                n.Type,
                n.ReferenceId,
                n.IsRead,
                n.CreatedAt
            })
            .ToListAsync();

        return Ok(new { total, page, pageSize, items });
    }

    [HttpPost("read")]
    public async Task<IActionResult> MarkAsRead([FromBody] MarkReadDto dto)
    {
        var userIdString = User.FindFirst("id")?.Value;
        if (string.IsNullOrEmpty(userIdString)) return Unauthorized();
        var userId = int.Parse(userIdString);

        IQueryable<Notification> query = _context.Notifications.Where(n => n.UserId == userId);

        if (dto.All)
        {
            var toUpdate = await query.Where(n => !n.IsRead).ToListAsync();
            foreach (var n in toUpdate) n.IsRead = true;
        }
        else if (dto.Ids != null && dto.Ids.Any())
        {
            var toUpdate = await query.Where(n => dto.Ids.Contains(n.Id)).ToListAsync();
            foreach (var n in toUpdate) n.IsRead = true;
        }
        else
        {
            return BadRequest("Specify Ids or set All=true");
        }

        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }
}

public class MarkReadDto
{
    public bool All { get; set; } = false;
    public List<int>? Ids { get; set; }
}
