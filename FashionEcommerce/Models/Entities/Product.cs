using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FashionEcommerce.Models.Entities;

[Table("Products")]
public class Product
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    public string? Slug { get; set; }

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int CategoryId { get; set; }

    [ForeignKey("CategoryId")]
    public Category? Category { get; set; }

    public string? Thumbnail { get; set; }

    public bool IsActive { get; set; } = true;

    public List<ProductVariant>? Variants { get; set; }

    public List<ProductImage>? Images { get; set; }
}
