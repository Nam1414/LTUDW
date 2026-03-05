using FashionEcommerce.Models.Entities;

namespace FashionEcommerce.Repositories.Interfaces
{
    /// <summary>
    /// Interface định nghĩa các phương thức truy xuất dữ liệu cho User
    /// </summary>
    public interface IUserRepository
    {
        /// <summary>
        /// Lấy user theo email
        /// </summary>
        Task<User?> GetByEmailAsync(string email);

        /// <summary>
        /// Lấy user theo ID
        /// </summary>
        Task<User?> GetByIdAsync(int id);

        /// <summary>
        /// Kiểm tra email đã tồn tại chưa
        /// </summary>
        Task<bool> EmailExistsAsync(string email);

        /// <summary>
        /// Tạo user mới
        /// </summary>
        Task<User> CreateAsync(User user);

        /// <summary>
        /// Cập nhật user
        /// </summary>
        Task<User> UpdateAsync(User user);

        /// <summary>
        /// Lấy danh sách tất cả users (có phân trang)
        /// </summary>
        Task<List<User>> GetAllAsync(int page = 1, int pageSize = 10);
    }
}

