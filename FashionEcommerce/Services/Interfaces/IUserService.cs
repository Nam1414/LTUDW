using FashionEcommerce.Models.DTOs;

namespace FashionEcommerce.Services.Interfaces
{
    /// <summary>
    /// Interface định nghĩa các phương thức business logic cho User
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// Đăng ký tài khoản người dùng mới
        /// </summary>
        Task<(bool Success, string Message, UserDTO? User)> RegisterAsync(RegisterDTO registerDTO);

        /// <summary>
        /// Đăng nhập và trả về JWT token
        /// </summary>
        Task<(bool Success, string Message, LoginResponseDTO? Response)> LoginAsync(LoginDTO loginDTO);

        /// <summary>
        /// Lấy thông tin cá nhân của user đang đăng nhập
        /// </summary>
        Task<(bool Success, string Message, UserDTO? User)> GetProfileAsync(int userId);

        /// <summary>
        /// Cập nhật thông tin cá nhân
        /// </summary>
        Task<(bool Success, string Message, UserDTO? User)> UpdateProfileAsync(int userId, UpdateProfileDTO updateDTO);

        /// <summary>
        /// Khóa tài khoản người dùng (Admin only)
        /// </summary>
        Task<(bool Success, string Message)> LockUserAsync(int userId, int adminId);

        /// <summary>
        /// Mở khóa tài khoản người dùng (Admin only)
        /// </summary>
        Task<(bool Success, string Message)> UnlockUserAsync(int userId, int adminId);

        /// <summary>
        /// Lấy thông tin user theo ID
        /// </summary>
        Task<(bool Success, string Message, UserDTO? User)> GetUserByIdAsync(int userId);
    }
}

