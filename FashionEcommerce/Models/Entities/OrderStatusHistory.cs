namespace FashionEcommerce.Models.Entities;

public class OrderStatusHistory
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public string OldStatus { get; set; } = string.Empty;
    public string NewStatus { get; set; } = string.Empty;
    public string Note { get; set; } = string.Empty;
    public int ChangedBy { get; set; } // adminId
    public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
    public Order Order { get; set; } = null!;
}
