namespace LTUDW.Models;

public class MasterSize
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public ICollection<ProductVariant>? ProductVariants { get; set; }
}