namespace FashionEcommerce.Models.DTOs
{
    /// <summary>
    /// DTO trả về thông tin người dùng
    /// </summary>
    public class UserDTO
    {
        /// <summary>
        /// ID người dùng
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Tên đăng nhập
        /// </summary>
        public string? Username { get; set; }

        /// <summary>
        /// Email người dùng
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Google ID
        /// </summary>
        public string? GoogleId { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Họ tên người dùng
        /// </summary>
        public string? FullName { get; set; }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// URL ảnh đại diện
        /// </summary>
        public string? AvatarUrl { get; set; }

        /// <summary>
        /// Vai trò của người dùng
        /// </summary>
        public string Role { get; set; } = string.Empty;

        /// <summary>
        /// Trạng thái khóa tài khoản
        /// </summary>
        public bool IsLocked { get; set; }

        /// <summary>
        /// Ngày tạo tài khoản
        /// </summary>
        public DateTime CreatedAt { get; set; }
    }
}

