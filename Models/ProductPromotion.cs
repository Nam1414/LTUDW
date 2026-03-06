public class ProductPromotion
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public int PromotionId { get; set; }

    public Promotion? Promotion { get; set; }
}