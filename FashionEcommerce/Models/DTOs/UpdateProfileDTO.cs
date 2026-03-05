using System.ComponentModel.DataAnnotations;

namespace FashionEcommerce.Models.DTOs
{
    /// <summary>
    /// DTO cho yêu cầu cập nhật thông tin cá nhân
    /// </summary>
    public class UpdateProfileDTO
    {
        /// <summary>
        /// Họ tên người dùng
        /// </summary>
        [MaxLength(100, ErrorMessage = "Họ tên không được quá 100 ký tự")]
        public string? FullName { get; set; }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        [MaxLength(20, ErrorMessage = "Số điện thoại không được quá 20 ký tự")]
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// Địa chỉ
        /// </summary>
        [MaxLength(500, ErrorMessage = "Địa chỉ không được quá 500 ký tự")]
        public string? Address { get; set; }
    }
}

