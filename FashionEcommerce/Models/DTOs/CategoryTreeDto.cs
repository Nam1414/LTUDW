namespace FashionEcommerce.Models.DTOs
{
    /// <summary>
    /// CategoryTree DTO - Data Transfer Object cho tree structure
    /// </summary>
    public class CategoryTreeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public int? ParentId { get; set; }
        public bool IsActive { get; set; }
        public List<CategoryTreeDto> Children { get; set; } = new List<CategoryTreeDto>();
    }
}

