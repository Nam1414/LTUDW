using System.ComponentModel.DataAnnotations;
 
namespace FashionEcommerce.Models;

public class User
{
    public int Id { get; set; }
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    public string? Username { get; set; }
    public string PasswordHash { get; set; } = string.Empty;
    public string? FullName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? GoogleId { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? AvatarUrl { get; set; }
    public string Role { get; set; } = "Customer"; // Admin/Customer
    public bool IsLocked { get; set; } 
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}
