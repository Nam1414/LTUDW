namespace LTUDW.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public string? Thumbnail { get; set; }
    public bool? IsActive { get; set; }

    public Category? Category { get; set; }
    public ICollection<ProductVariant>? ProductVariants { get; set; }
    public ICollection<ProductImage>? ProductImages { get; set; }
    public ICollection<ProductPromotion>? ProductPromotions { get; set; }
    public ICollection<ProductReview>? ProductReviews { get; set; }
}