namespace LTUDW.Models;

public class Coupon
{
    public int Id { get; set; }
    public string Code { get; set; } = null!;
    public int UserId { get; set; }
    public int PromotionId { get; set; }
    public bool? IsUsed { get; set; }
    public DateTime ExpiryDate { get; set; }
    public DateTime? CreatedAt { get; set; }

    public User? User { get; set; }
    public Promotion? Promotion { get; set; }
}