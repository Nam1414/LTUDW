using System.ComponentModel.DataAnnotations;

namespace FashionEcommerce.Models.DTOs
{
    /// <summary>
    /// DTO cho yêu cầu đăng nhập
    /// </summary>
    public class LoginDTO
    {
        /// <summary>
        /// Email người dùng (bắt buộc)
        /// </summary>
        [Required(ErrorMessage = "Email là bắt buộc")]
        [EmailAddress(ErrorMessage = "Định dạng email không hợp lệ")]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Mật khẩu (bắt buộc)
        /// </summary>
        [Required(ErrorMessage = "Mật khẩu là bắt buộc")]
        public string Password { get; set; } = string.Empty;
    }
}

