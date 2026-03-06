using FashionEcommerce.Models.DTOs;

namespace FashionEcommerce.Services.Interfaces
{
    /// <summary>
    /// Interface cho Product Service
    /// </summary>
    public interface IProductService
    {
        /// <summary>
        /// Lấy danh sách products với filter và pagination (Customer - chỉ lấy IsActive = true)
        /// </summary>
        Task<PagedResult<ProductDto>> GetAllAsync(ProductQueryParameters queryParameters, CancellationToken cancellationToken = default);

        /// <summary>
        /// Lấy danh sách products bao gồm cả inactive (Admin)
        /// </summary>
        Task<PagedResult<ProductDto>> GetAllForAdminAsync(ProductQueryParameters queryParameters, CancellationToken cancellationToken = default);

        /// <summary>
        /// Lấy product theo Id
        /// </summary>
        Task<ProductDto?> GetByIdAsync(int id);

        /// <summary>
        /// Tạo mới product
        /// </summary>
        Task<ProductDto> CreateAsync(CreateProductDto createDto);

        /// <summary>
        /// Cập nhật product
        /// </summary>
        Task<ProductDto?> UpdateAsync(int id, UpdateProductDto updateDto);

        /// <summary>
        /// Xóa product
        /// </summary>
        Task<bool> DeleteAsync(int id);
    }
}
