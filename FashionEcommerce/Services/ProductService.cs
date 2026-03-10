using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Data;
using FashionEcommerce.Models.Entities;
using FashionEcommerce.Models.DTOs;
using FashionEcommerce.Services.Interfaces;

namespace FashionEcommerce.Services
{
    /// <summary>
    /// Product Service - Xử lý logic nghiệp vụ cho Product
    /// </summary>
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách products với filter và pagination (Customer - chỉ lấy IsActive = true)
        /// </summary>
        public async Task<PagedResult<ProductDto>> GetAllAsync(
            ProductQueryParameters queryParameters, 
            CancellationToken cancellationToken = default)
        {
            // Bắt đầu với IQueryable để tận dụng lazy loading
            var query = _context.Products
                .AsNoTracking()
                .Include(p => p.Category)
                .Where(p => p.IsActive)
                .AsQueryable();

            // Apply filters
            query = ApplyFilters(query, queryParameters);

            // EF Core 9: Sử dụng CountAsync với CancellationToken
            var totalItems = await query.CountAsync(cancellationToken);

            // Calculate total pages
            var totalPages = queryParameters.PageSize > 0
                ? (int)Math.Ceiling(totalItems / (double)queryParameters.PageSize)
                : 0;

            // Apply pagination với CancellationToken
            var items = await query
                .Skip((queryParameters.PageIndex - 1) * queryParameters.PageSize)
                .Take(queryParameters.PageSize)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Slug = p.Slug,
                    Description = p.Description,
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category != null ? p.Category.Name : null,
                    Thumbnail = p.Thumbnail,
                    IsActive = p.IsActive
                })
                .ToListAsync(cancellationToken);

            return new PagedResult<ProductDto>
            {
                TotalItems = totalItems,
                TotalPages = totalPages,
                PageIndex = queryParameters.PageIndex,
                PageSize = queryParameters.PageSize,
                Items = items
            };
        }

        /// <summary>
        /// Lấy danh sách products bao gồm cả inactive (Admin)
        /// </summary>
        public async Task<PagedResult<ProductDto>> GetAllForAdminAsync(
            ProductQueryParameters queryParameters,
            CancellationToken cancellationToken = default)
        {
            // Bắt đầu với IQueryable - lấy tất cả không filter IsActive
            var query = _context.Products
                .AsNoTracking()
                .Include(p => p.Category)
                .AsQueryable();

            // Apply filters
            query = ApplyFilters(query, queryParameters);

            // EF Core 9: Sử dụng CountAsync với CancellationToken
            var totalItems = await query.CountAsync(cancellationToken);

            var totalPages = queryParameters.PageSize > 0
                ? (int)Math.Ceiling(totalItems / (double)queryParameters.PageSize)
                : 0;

            var items = await query
                .Skip((queryParameters.PageIndex - 1) * queryParameters.PageSize)
                .Take(queryParameters.PageSize)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Slug = p.Slug,
                    Description = p.Description,
                    Price = p.Price,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category != null ? p.Category.Name : null,
                    Thumbnail = p.Thumbnail,
                    IsActive = p.IsActive
                })
                .ToListAsync(cancellationToken);

            return new PagedResult<ProductDto>
            {
                TotalItems = totalItems,
                TotalPages = totalPages,
                PageIndex = queryParameters.PageIndex,
                PageSize = queryParameters.PageSize,
                Items = items
            };
        }

        /// <summary>
        /// Apply các filter lên query
        /// </summary>
        private IQueryable<Product> ApplyFilters(IQueryable<Product> query, ProductQueryParameters parameters)
        {
            // Filter by SearchTerm (Name)
            if (!string.IsNullOrWhiteSpace(parameters.SearchTerm))
            {
                var searchTerm = parameters.SearchTerm.ToLower();
                query = query.Where(p => p.Name.ToLower().Contains(searchTerm));
            }

            // Filter by CategoryId
            if (parameters.CategoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == parameters.CategoryId.Value);
            }

            // Filter by MinPrice
            if (parameters.MinPrice.HasValue)
            {
                query = query.Where(p => p.Price >= parameters.MinPrice.Value);
            }

            // Filter by MaxPrice
            if (parameters.MaxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= parameters.MaxPrice.Value);
            }

            return query;
        }

        /// <summary>
        /// Lấy product theo Id
        /// </summary>
        public async Task<ProductDto?> GetByIdAsync(int id)
        {
            var product = await _context.Products
                .AsNoTracking()
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return null;

            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Slug = product.Slug,
                Description = product.Description,
                Price = product.Price,
                CategoryId = product.CategoryId,
                CategoryName = product.Category?.Name,
                Thumbnail = product.Thumbnail,
                IsActive = product.IsActive
            };
        }

        /// <summary>
        /// Tạo mới product
        /// </summary>
        public async Task<ProductDto> CreateAsync(CreateProductDto createDto)
        {
            // Kiểm tra Slug đã tồn tại chưa
            if (await _context.Products.AnyAsync(p => p.Slug == createDto.Slug))
            {
                throw new InvalidOperationException($"Product with slug '{createDto.Slug}' already exists.");
            }

            // Kiểm tra CategoryId có hợp lệ không
            var categoryExists = await _context.Categories.AnyAsync(c => c.Id == createDto.CategoryId);
            if (!categoryExists)
            {
                throw new InvalidOperationException($"Category with Id '{createDto.CategoryId}' does not exist.");
            }

            var product = new Product
            {
                Name = createDto.Name,
                Slug = createDto.Slug,
                Description = createDto.Description,
                Price = createDto.Price,
                CategoryId = createDto.CategoryId,
                Thumbnail = createDto.Thumbnail,
                IsActive = createDto.IsActive
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // Lấy category name để trả về
            var category = await _context.Categories
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == product.CategoryId);

            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Slug = product.Slug,
                Description = product.Description,
                Price = product.Price,
                CategoryId = product.CategoryId,
                CategoryName = category?.Name,
                Thumbnail = product.Thumbnail,
                IsActive = product.IsActive
            };
        }

        /// <summary>
        /// Cập nhật product
        /// </summary>
        public async Task<ProductDto?> UpdateAsync(int id, UpdateProductDto updateDto)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return null;

            // Kiểm tra Slug đã tồn tại chưa (trừ chính nó)
            if (await _context.Products.AnyAsync(p => p.Slug == updateDto.Slug && p.Id != id))
            {
                throw new InvalidOperationException($"Product with slug '{updateDto.Slug}' already exists.");
            }

            // Kiểm tra CategoryId có hợp lệ không
            var categoryExists = await _context.Categories.AnyAsync(c => c.Id == updateDto.CategoryId);
            if (!categoryExists)
            {
                throw new InvalidOperationException($"Category with Id '{updateDto.CategoryId}' does not exist.");
            }

            product.Name = updateDto.Name;
            product.Slug = updateDto.Slug;
            product.Description = updateDto.Description;
            product.Price = updateDto.Price;
            product.CategoryId = updateDto.CategoryId;
            product.Thumbnail = updateDto.Thumbnail;
            product.IsActive = updateDto.IsActive;

            await _context.SaveChangesAsync();

            // Lấy category name để trả về
            var category = await _context.Categories
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == product.CategoryId);

            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Slug = product.Slug,
                Description = product.Description,
                Price = product.Price,
                CategoryId = product.CategoryId,
                CategoryName = category?.Name,
                Thumbnail = product.Thumbnail,
                IsActive = product.IsActive
            };
        }

        /// <summary>
        /// Xóa product
        /// </summary>
        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
