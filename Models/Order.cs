namespace LTUDW.Models;

public class Order
{
    public int Id { get; set; }
    public string OrderCode { get; set; } = null!;
    public int? UserId { get; set; }
    public DateTime? OrderDate { get; set; }
    public string ShippingName { get; set; } = null!;
    public string ShippingAddress { get; set; } = null!;
    public string ShippingPhone { get; set; } = null!;
    public decimal TotalAmount { get; set; }
    public decimal? DiscountAmount { get; set; }
    public string? CouponCode { get; set; }
    public decimal? ShippingFee { get; set; }
    public decimal FinalAmount { get; set; }
    public string PaymentMethod { get; set; } = null!;
    public string? PaymentStatus { get; set; }
    public int? Status { get; set; }

    public User? User { get; set; }
    public ICollection<OrderDetail>? OrderDetails { get; set; }
    public ICollection<OrderStatusHistory>? OrderStatusHistories { get; set; }
}