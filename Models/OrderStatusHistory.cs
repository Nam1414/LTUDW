namespace LTUDW.Models;

public class OrderStatusHistory
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int? PreviousStatus { get; set; }
    public int NewStatus { get; set; }
    public string? Note { get; set; }
    public string? UpdatedBy { get; set; }
    public DateTime? Timestamp { get; set; }

    public Order? Order { get; set; }
}