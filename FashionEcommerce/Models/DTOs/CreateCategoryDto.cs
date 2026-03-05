using System.ComponentModel.DataAnnotations;

namespace FashionEcommerce.Models.DTOs
{
    /// <summary>
    /// Create Category DTO
    /// </summary>
    public class CreateCategoryDto
    {
        [Required(ErrorMessage = "Name is required")]
        [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Slug is required")]
        [MaxLength(100, ErrorMessage = "Slug cannot exceed 100 characters")]
        public string Slug { get; set; } = string.Empty;

        public int? ParentId { get; set; }

        public bool IsActive { get; set; } = true;
    }
}

