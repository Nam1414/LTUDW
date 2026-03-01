public class PromotionCondition
{
    public int Id { get; set; }
    public int PromotionId { get; set; }
    public string Field { get; set; } = null!;
    public string Operator { get; set; } = null!;
    public string Value { get; set; } = null!;
}