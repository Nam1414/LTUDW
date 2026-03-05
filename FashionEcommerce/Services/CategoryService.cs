using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Data;
using FashionEcommerce.Models.DTOs;
using FashionEcommerce.Models.Entities;
using FashionEcommerce.Services.Interfaces;

namespace FashionEcommerce.Services
{
    /// <summary>
    /// Category Service - Xử lý logic nghiệp vụ cho Category
    /// </summary>
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;

        public CategoryService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách tất cả categories
        /// </summary>
        public async Task<IEnumerable<CategoryDto>> GetAllAsync()
        {
            return await _context.Categories
                .AsNoTracking()
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Slug = c.Slug,
                    ParentId = c.ParentId,
                    IsActive = c.IsActive
                })
                .ToListAsync();
        }

        /// <summary>
        /// Lấy danh sách categories theo cấu trúc cây
        /// </summary>
        public async Task<IEnumerable<CategoryTreeDto>> GetTreeAsync()
        {
            var allCategories = await _context.Categories
                .AsNoTracking()
                .ToListAsync();

            // Lấy danh sách root categories (ParentId = null)
            var rootCategories = allCategories
                .Where(c => c.ParentId == null)
                .ToList();

            // Build tree bằng đệ quy
            var tree = rootCategories
                .Select(c => BuildCategoryTree(c, allCategories))
                .ToList();

            return tree;
        }

        /// <summary>
        /// Hàm đệ quy để build cây category
        /// </summary>
        private CategoryTreeDto BuildCategoryTree(Category category, List<Category> allCategories)
        {
            var children = allCategories
                .Where(c => c.ParentId == category.Id)
                .Select(c => BuildCategoryTree(c, allCategories))
                .ToList();

            return new CategoryTreeDto
            {
                Id = category.Id,
                Name = category.Name,
                Slug = category.Slug,
                ParentId = category.ParentId,
                IsActive = category.IsActive,
                Children = children
            };
        }

        /// <summary>
        /// Lấy category theo Id
        /// </summary>
        public async Task<CategoryDto?> GetByIdAsync(int id)
        {
            var category = await _context.Categories
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                return null;

            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                Slug = category.Slug,
                ParentId = category.ParentId,
                IsActive = category.IsActive
            };
        }

        /// <summary>
        /// Tạo mới category
        /// </summary>
        public async Task<CategoryDto> CreateAsync(CreateCategoryDto createDto)
        {
            // Kiểm tra Slug đã tồn tại chưa
            if (await _context.Categories.AnyAsync(c => c.Slug == createDto.Slug))
            {
                throw new InvalidOperationException($"Category with slug '{createDto.Slug}' already exists.");
            }

            // Kiểm tra ParentId có hợp lệ không
            if (createDto.ParentId.HasValue)
            {
                var parentExists = await _context.Categories.AnyAsync(c => c.Id == createDto.ParentId);
                if (!parentExists)
                {
                    throw new InvalidOperationException($"Parent category with Id '{createDto.ParentId}' does not exist.");
                }
            }

            var category = new Category
            {
                Name = createDto.Name,
                Slug = createDto.Slug,
                ParentId = createDto.ParentId,
                IsActive = createDto.IsActive
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                Slug = category.Slug,
                ParentId = category.ParentId,
                IsActive = category.IsActive
            };
        }

        /// <summary>
        /// Cập nhật category
        /// </summary>
        public async Task<CategoryDto?> UpdateAsync(int id, UpdateCategoryDto updateDto)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
                return null;

            // Kiểm tra Slug đã tồn tại chưa (trừ chính nó)
            if (await _context.Categories.AnyAsync(c => c.Slug == updateDto.Slug && c.Id != id))
            {
                throw new InvalidOperationException($"Category with slug '{updateDto.Slug}' already exists.");
            }

            // Kiểm tra ParentId có hợp lệ không
            if (updateDto.ParentId.HasValue)
            {
                // Không cho phép ParentId = chính nó (tránh circular reference)
                if (updateDto.ParentId.Value == id)
                {
                    throw new InvalidOperationException("Category cannot be its own parent.");
                }

                var parentExists = await _context.Categories.AnyAsync(c => c.Id == updateDto.ParentId);
                if (!parentExists)
                {
                    throw new InvalidOperationException($"Parent category with Id '{updateDto.ParentId}' does not exist.");
                }
            }

            category.Name = updateDto.Name;
            category.Slug = updateDto.Slug;
            category.ParentId = updateDto.ParentId;
            category.IsActive = updateDto.IsActive;

            await _context.SaveChangesAsync();

            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                Slug = category.Slug,
                ParentId = category.ParentId,
                IsActive = category.IsActive
            };
        }

        /// <summary>
        /// Xóa category
        /// </summary>
        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
                return false;

            // Kiểm tra xem có category con không
            var hasChildren = await _context.Categories.AnyAsync(c => c.ParentId == id);
            if (hasChildren)
            {
                throw new InvalidOperationException("Cannot delete category that has child categories.");
            }

            // Kiểm tra xem có sản phẩm nào không
            var hasProducts = await _context.Products.AnyAsync(p => p.CategoryId == id);
            if (hasProducts)
            {
                throw new InvalidOperationException("Cannot delete category that has products.");
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

