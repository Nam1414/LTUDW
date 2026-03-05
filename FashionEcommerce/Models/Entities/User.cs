using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FashionEcommerce.Models.Entities
{
    /// <summary>
    /// User Entity - Lưu trữ thông tin người dùng trong hệ thống
    /// </summary>
    [Table("Users")]
    public class User
    {
        /// <summary>
        /// Khóa chính - ID người dùng
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        /// <summary>
        /// Tên đăng nhập
        /// </summary>
        [MaxLength(100)]
        public string? Username { get; set; }

        /// <summary>
        /// Mật khẩu đã được băm (BCrypt hash)
        /// </summary>
        [Required]
        [MaxLength(255)]
        public string PasswordHash { get; set; } = string.Empty;

        /// <summary>
        /// Email người dùng (unique, required)
        /// </summary>
        [Required]
        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Google ID cho đăng nhập Google (nullable)
        /// </summary>
        [MaxLength(255)]
        public string? GoogleId { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Họ tên người dùng
        /// </summary>
        [MaxLength(100)]
        public string? FullName { get; set; }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        [MaxLength(20)]
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// URL ảnh đại diện
        /// </summary>
        [MaxLength(500)]
        public string? AvatarUrl { get; set; }

        /// <summary>
        /// Vai trò của người dùng (Admin/Customer)
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string Role { get; set; } = "Customer";

        /// <summary>
        /// Trạng thái khóa tài khoản (true = bị khóa, false = hoạt động)
        /// </summary>
        public bool IsLocked { get; set; } = false;

        /// <summary>
        /// Ngày tạo tài khoản
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

