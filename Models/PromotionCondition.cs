public class PromotionCondition
{
    public int Id { get; set; }

    public int PromotionId { get; set; }

    public string Field { get; set; } = string.Empty;

    public string Operator { get; set; } = string.Empty;

    public string Value { get; set; } = string.Empty;

    public Promotion? Promotion { get; set; }
}