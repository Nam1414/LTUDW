using System.ComponentModel.DataAnnotations;

namespace FashionEcommerce.Models.DTOs
{
    /// <summary>
    /// Create Product DTO
    /// </summary>
    public class CreateProductDto
    {
        [Required(ErrorMessage = "Name is required")]
        [MaxLength(200, ErrorMessage = "Name cannot exceed 200 characters")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Slug is required")]
        [MaxLength(200, ErrorMessage = "Slug cannot exceed 200 characters")]
        public string Slug { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be greater than or equal to 0")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "CategoryId is required")]
        public int CategoryId { get; set; }

        [MaxLength(500, ErrorMessage = "Thumbnail cannot exceed 500 characters")]
        public string? Thumbnail { get; set; }

        public bool IsActive { get; set; } = true;
    }
}

