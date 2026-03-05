using Microsoft.AspNetCore.Mvc;
using FashionEcommerce.Models.DTOs;
using FashionEcommerce.Services.Interfaces;

namespace FashionEcommerce.Controllers
{
    /// <summary>
    /// Products Controller - API cho quản lý Products
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        /// <summary>
        /// GET /api/products
        /// Lấy danh sách sản phẩm với filter và pagination
        /// Query parameters: SearchTerm, CategoryId, MinPrice, MaxPrice, PageIndex, PageSize
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<PagedResult<ProductDto>>> GetAll([FromQuery] ProductQueryParameters queryParameters)
        {
            var result = await _productService.GetAllAsync(queryParameters);
            return Ok(result);
        }

        /// <summary>
        /// GET /api/products/{id}
        /// Xem chi tiết sản phẩm (bao gồm tên danh mục)
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetById(int id)
        {
            var product = await _productService.GetByIdAsync(id);
            
            if (product == null)
            {
                return NotFound(new { message = $"Product with Id {id} not found." });
            }

            return Ok(product);
        }

        /// <summary>
        /// POST /api/products
        /// Tạo mới sản phẩm
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductDto createDto)
        {
            try
            {
                var product = await _productService.CreateAsync(createDto);
                return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// PUT /api/products/{id}
        /// Cập nhật sản phẩm
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<ProductDto>> Update(int id, [FromBody] UpdateProductDto updateDto)
        {
            try
            {
                var product = await _productService.UpdateAsync(id, updateDto);
                
                if (product == null)
                {
                    return NotFound(new { message = $"Product with Id {id} not found." });
                }

                return Ok(product);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// DELETE /api/products/{id}
        /// Xóa sản phẩm
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _productService.DeleteAsync(id);
            
            if (!result)
            {
                return NotFound(new { message = $"Product with Id {id} not found." });
            }

            return NoContent();
        }
    }
}

