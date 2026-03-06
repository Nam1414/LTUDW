using System.ComponentModel.DataAnnotations;

namespace LTUDW.Models;

public class Product
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    public string? Slug { get; set; }

    public decimal Price { get; set; }

    public int CategoryId { get; set; }

    public string? Thumbnail { get; set; }

    public bool? IsActive { get; set; }

    public List<ProductVariant>? Variants { get; set; }

    public List<ProductImage>? Images { get; set; }
}