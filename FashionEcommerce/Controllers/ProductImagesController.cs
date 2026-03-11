using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Data;
using FashionEcommerce.Models.Entities;

[Authorize]
[ApiController]
[Route("api/products/[controller]")]  // ← QUAN TRỌNG: api/products/images
public class ProductImagesController : ControllerBase
{
    private readonly AppDbContext _context;
    public ProductImagesController(AppDbContext context) => _context = context;

    [HttpPost("{productId}")]
    public async Task<IActionResult> AddImage(int productId, [FromBody] AddImageDto dto)
    {
        var product = await _context.Products.FindAsync(productId);
        if (product == null) return NotFound("Product not found");

        var image = new ProductImage
        {
            ProductId = productId,
            ImageUrl = dto.ImageUrl,
            SortOrder = dto.SortOrder,
            CreatedAt = DateTime.UtcNow
        };
        _context.ProductImages.Add(image);
        await _context.SaveChangesAsync();

        // ✅ FIXED: No circular reference
        return Ok(new 
        {
            id = image.Id,
            productId = image.ProductId,
            imageUrl = image.ImageUrl,
            sortOrder = image.SortOrder,
            createdAt = image.CreatedAt
        });
    }


    [HttpPut("{productId}/{imageId}")]
    public async Task<IActionResult> UpdateSortOrder(int productId, int imageId, [FromBody] int sortOrder)
    {
        var image = await _context.ProductImages
            .FirstOrDefaultAsync(pi => pi.ProductId == productId && pi.Id == imageId);
        if (image == null) return NotFound("Image not found");

        image.SortOrder = sortOrder;
        await _context.SaveChangesAsync();
        return Ok(new { id = image.Id, productId = image.ProductId, imageUrl = image.ImageUrl, sortOrder = image.SortOrder });
    }

    [HttpDelete("{productId}/{imageId}")]
    public async Task<IActionResult> DeleteImage(int productId, int imageId)
    {
        var image = await _context.ProductImages
            .FirstOrDefaultAsync(pi => pi.ProductId == productId && pi.Id == imageId);
        if (image == null) return NotFound("Image not found");

        _context.ProductImages.Remove(image);
        await _context.SaveChangesAsync();
        return Ok("Image deleted");
    }


    public class AddImageDto
    {
        public string ImageUrl { get; set; } = string.Empty;
        public int SortOrder { get; set; } = 0;
    }
}
