public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public int? ParentId { get; set; }
    public bool? IsActive { get; set; }
}