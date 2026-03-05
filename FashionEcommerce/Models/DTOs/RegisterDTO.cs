using System.ComponentModel.DataAnnotations;

namespace FashionEcommerce.Models.DTOs
{
    /// <summary>
    /// DTO cho yêu cầu đăng ký tài khoản
    /// </summary>
    public class RegisterDTO
    {
        /// <summary>
        /// Email người dùng (bắt buộc, định dạng email hợp lệ)
        /// </summary>
        [Required(ErrorMessage = "Email là bắt buộc")]
        [EmailAddress(ErrorMessage = "Định dạng email không hợp lệ")]
        [MaxLength(255, ErrorMessage = "Email không được quá 255 ký tự")]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Tên đăng nhập
        /// </summary>
        [MaxLength(100, ErrorMessage = "Tên đăng nhập không được quá 100 ký tự")]
        public string? Username { get; set; }

        /// <summary>
        /// Mật khẩu (bắt buộc, tối thiểu 6 ký tự)
        /// </summary>
        [Required(ErrorMessage = "Mật khẩu là bắt buộc")]
        [MinLength(6, ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự")]
        [MaxLength(100, ErrorMessage = "Mật khẩu không được quá 100 ký tự")]
        public string Password { get; set; } = string.Empty;

        /// <summary>
        /// Xác nhận mật khẩu (phải trùng với Password)
        /// </summary>
        [Required(ErrorMessage = "Xác nhận mật khẩu là bắt buộc")]
        [Compare("Password", ErrorMessage = "Mật khẩu và xác nhận mật khẩu không khớp")]
        public string ConfirmPassword { get; set; } = string.Empty;

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
    }
}

