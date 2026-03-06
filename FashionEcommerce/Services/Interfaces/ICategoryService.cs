using FashionEcommerce.Models.DTOs;

namespace FashionEcommerce.Services.Interfaces
{
    /// <summary>
    /// Interface cho Category Service
    /// </summary>
    public interface ICategoryService
    {
        /// <summary>
        /// Lấy danh sách tất cả categories (Customer - chỉ lấy IsActive = true)
        /// </summary>
        Task<IEnumerable<CategoryDto>> GetAllAsync();

        /// <summary>
        /// Lấy danh sách tất cả categories bao gồm cả inactive (Admin)
        /// </summary>
        Task<IEnumerable<CategoryDto>> GetAllForAdminAsync();

        /// <summary>
        /// Lấy danh sách categories theo cấu trúc cây (Customer - chỉ lấy IsActive = true)
        /// </summary>
        Task<IEnumerable<CategoryTreeDto>> GetTreeAsync();

        /// <summary>
        /// Lấy danh sách categories theo cấu trúc cây bao gồm cả inactive (Admin)
        /// </summary>
        Task<IEnumerable<CategoryTreeDto>> GetTreeForAdminAsync();

        /// <summary>
        /// Lấy category theo Id
        /// </summary>
        Task<CategoryDto?> GetByIdAsync(int id);

        /// <summary>
        /// Tạo mới category
        /// </summary>
        Task<CategoryDto> CreateAsync(CreateCategoryDto createDto);

        /// <summary>
        /// Cập nhật category
        /// </summary>
        Task<CategoryDto?> UpdateAsync(int id, UpdateCategoryDto updateDto);

        /// <summary>
        /// Xóa category
        /// </summary>
        Task<bool> DeleteAsync(int id);
    }
}

