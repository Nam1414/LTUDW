public class OrderDetail
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ProductVariantId { get; set; }
    public string Snapshot_ProductName { get; set; } = null!;
    public string Snapshot_Sku { get; set; } = null!;
    public string? Snapshot_Thumbnail { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}