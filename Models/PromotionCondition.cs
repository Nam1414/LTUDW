public class PromotionCondition
{
    public int Id { get; set; }

    public int PromotionId { get; set; }

    public string Field { get; set; }

    public string Operator { get; set; }

    public string Value { get; set; }

    public Promotion? Promotion { get; set; }
}