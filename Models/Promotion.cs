namespace LTUDW.Models;

public class Promotion
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string DiscountType { get; set; } = null!;
    public decimal DiscountValue { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public bool? IsActive { get; set; }
    public int? Priority { get; set; }

    public ICollection<ProductPromotion>? ProductPromotions { get; set; }
    public ICollection<PromotionCondition>? PromotionConditions { get; set; }
    public ICollection<Coupon>? Coupons { get; set; }
}