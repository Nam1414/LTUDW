namespace FashionEcommerce.Api.Models;

public class Notification
{
    public int Id { get; set; }
    public int UserId { get; set; }  // INT (match User.Id)
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public bool IsRead { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Type { get; set; } = "OrderStatusChanged";
    public int? ReferenceId { get; set; } // OrderId

    public User User { get; set; } = null!;
}
