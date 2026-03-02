namespace LTUDW.Models;

public class MasterColor
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string HexCode { get; set; } = null!;

    public ICollection<ProductVariant>? ProductVariants { get; set; }
}