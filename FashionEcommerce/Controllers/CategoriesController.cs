using Microsoft.AspNetCore.Mvc;
using FashionEcommerce.Models.DTOs;
using FashionEcommerce.Services.Interfaces;

namespace FashionEcommerce.Controllers
{
    /// <summary>
    /// Categories Controller - API cho quản lý Categories
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        /// <summary>
        /// GET /api/categories
        /// Lấy danh sách tất cả danh mục
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll()
        {
            var categories = await _categoryService.GetAllAsync();
            return Ok(categories);
        }

        /// <summary>
        /// GET /api/categories/tree
        /// Trả về danh sách danh mục theo cấu trúc cây (Tree)
        /// </summary>
        [HttpGet("tree")]
        public async Task<ActionResult<IEnumerable<CategoryTreeDto>>> GetTree()
        {
            var categories = await _categoryService.GetTreeAsync();
            return Ok(categories);
        }

        /// <summary>
        /// GET /api/categories/{id}
        /// Lấy chi tiết category theo Id
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetById(int id)
        {
            var category = await _categoryService.GetByIdAsync(id);
            
            if (category == null)
            {
                return NotFound(new { message = $"Category with Id {id} not found." });
            }

            return Ok(category);
        }

        /// <summary>
        /// POST /api/categories
        /// Tạo mới danh mục
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<CategoryDto>> Create([FromBody] CreateCategoryDto createDto)
        {
            try
            {
                var category = await _categoryService.CreateAsync(createDto);
                return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// PUT /api/categories/{id}
        /// Cập nhật danh mục
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<CategoryDto>> Update(int id, [FromBody] UpdateCategoryDto updateDto)
        {
            try
            {
                var category = await _categoryService.UpdateAsync(id, updateDto);
                
                if (category == null)
                {
                    return NotFound(new { message = $"Category with Id {id} not found." });
                }

                return Ok(category);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// DELETE /api/categories/{id}
        /// Xóa danh mục
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _categoryService.DeleteAsync(id);
                
                if (!result)
                {
                    return NotFound(new { message = $"Category with Id {id} not found." });
                }

                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}

