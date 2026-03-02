namespace LTUDW.Models;
public class User
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? PasswordHash { get; set; }
    public string Email { get; set; } = null!;
    public string? GoogleId { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string FullName { get; set; } = null!;
    public string? PhoneNumber { get; set; }
    public string? AvatarUrl { get; set; }
    public string? Role { get; set; }
    public bool? IsLocked { get; set; }
    public DateTime? CreatedAt { get; set; }

    public ICollection<UserAddress>? UserAddresses { get; set; }
    public ICollection<CartItem>? CartItems { get; set; }
    public ICollection<Order>? Orders { get; set; }
    public ICollection<Notification>? Notifications { get; set; }
    public ICollection<ProductReview>? Reviews { get; set; }
    public ICollection<Coupon>? Coupons { get; set; }
}