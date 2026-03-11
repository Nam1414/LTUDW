namespace FashionEcommerce.Api.Models;

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Status { get; set; } = "Pending"; // Pending → Paid → Shipping → Completed / Cancelled
    public decimal TotalAmount { get; set; }
    public decimal DiscountAmount { get; set; } = 0;
    public decimal ShippingFee { get; set; } = 30000; // hard-code 30k
    public decimal FinalAmount { get; set; }
    public string ShippingAddress { get; set; } = string.Empty;
    public int? UpdatedBy { get; set; } // adminId
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public User User { get; set; } = null!;
    public List<OrderDetail> OrderDetails { get; set; } = new();
    public List<OrderStatusHistory> StatusHistories { get; set; } = new();
}
