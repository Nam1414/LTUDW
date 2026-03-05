namespace FashionEcommerce.Models.DTOs
{
    /// <summary>
    /// DTO trả về khi đăng nhập thành công (chứa JWT Token)
    /// </summary>
    public class LoginResponseDTO
    {
        /// <summary>
        /// JWT Token
        /// </summary>
        public string Token { get; set; } = string.Empty;

        /// <summary>
        /// Thời hạn token (phút)
        /// </summary>
        public int ExpiresIn { get; set; }

        /// <summary>
        /// Thông tin người dùng
        /// </summary>
        public UserDTO User { get; set; } = new UserDTO();
    }
}

