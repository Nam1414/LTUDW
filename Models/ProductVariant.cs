namespace LTUDW.Models;

public class ProductVariant
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public int ColorId { get; set; }

    public int SizeId { get; set; }

    public string Sku { get; set; }

    public int? Quantity { get; set; }

    public decimal? PriceModifier { get; set; }

    public Product? Product { get; set; }

    public MasterColor? Color { get; set; }

    public MasterSize? Size { get; set; }
}