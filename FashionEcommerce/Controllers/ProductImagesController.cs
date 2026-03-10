using FashionEcommerce.Data;
using FashionEcommerce.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FashionEcommerce.Controllers;

[Route("api/products")]
[ApiController]
public class ProductImagesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public ProductImagesController(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    // GET images of product
    [HttpGet("{productId}/images")]
    public async Task<IActionResult> GetImages(int productId)
    {
        var images = await _context.ProductImages
            .Where(i => i.ProductId == productId)
            .OrderBy(i => i.SortOrder)
            .ToListAsync();

        return Ok(images);
    }

    // UPLOAD image
    [HttpPost("{productId}/images/upload")]
    public async Task<IActionResult> UploadImage(int productId, IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("File not found");

        var uploadFolder = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads");

        if (!Directory.Exists(uploadFolder))
            Directory.CreateDirectory(uploadFolder);

        var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);

        var path = Path.Combine(uploadFolder, fileName);

        using (var stream = new FileStream(path, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var image = new ProductImage
        {
            ProductId = productId,
            ImageUrl = "/uploads/" + fileName,
            SortOrder = 0
        };

        _context.ProductImages.Add(image);
        await _context.SaveChangesAsync();

        return Ok(image);
    }

    // DELETE image
    [HttpDelete("images/{id}")]
    public async Task<IActionResult> DeleteImage(int id)
    {
        var image = await _context.ProductImages.FindAsync(id);

        if (image == null)
            return NotFound();

        _context.ProductImages.Remove(image);
        await _context.SaveChangesAsync();

        return Ok();
    }

    // SORT images
    [HttpPut("images/sort")]
    public async Task<IActionResult> SortImages([FromBody] List<ProductImage> images)
    {
        foreach (var item in images)
        {
            var image = await _context.ProductImages.FindAsync(item.Id);

            if (image != null)
                image.SortOrder = item.SortOrder;
        }

        await _context.SaveChangesAsync();

        return Ok();
    }
}