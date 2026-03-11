namespace FashionEcommerce.Models.Entities;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal Discount { get; set; }
    public int Stock { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<ProductImage> Images { get; set; } = new();
    public List<CartItem> CartItems { get; set; } = new();

    // Additional fields
    public string Slug { get; set; } = string.Empty;
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
    public string? Thumbnail { get; set; }
    public bool IsActive { get; set; } = true;
}

