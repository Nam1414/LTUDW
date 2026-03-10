using FashionEcommerce.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FashionEcommerce.Controllers;

[Route("api/variants")]
[ApiController]
public class ProductVariantsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductVariantsController(AppDbContext context)
    {
        _context = context;
    }

    // GET variants by product
    [HttpGet("product/{productId}")]
    public async Task<IActionResult> GetVariants(int productId)
    {
        var variants = await _context.ProductVariants
            .Where(v => v.ProductId == productId)
            .Include(v => v.Color)
            .Include(v => v.Size)
            .ToListAsync();

        return Ok(variants);
    }
}