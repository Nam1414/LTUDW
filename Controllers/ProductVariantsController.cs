using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LTUDW.Entity;
using LTUDW.Models;

namespace LTUDW.Controllers;

[ApiController]
[Route("api/variants")]
public class ProductVariantsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductVariantsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/variants/product/1
    [HttpGet("product/{productId}")]
    public async Task<IActionResult> GetVariantsByProduct(int productId)
    {
        var variants = await _context.ProductVariants
            .Where(v => v.ProductId == productId)
            .Join(_context.MasterColors,
                v => v.ColorId,
                c => c.Id,
                (v, c) => new { v, c })
            .Join(_context.MasterSizes,
                vc => vc.v.SizeId,
                s => s.Id,
                (vc, s) => new
                {
                    vc.v.Id,
                    vc.v.ProductId,
                    vc.v.Sku,
                    vc.v.Quantity,
                    vc.v.PriceModifier,
                    Color = vc.c.Name,
                    ColorHex = vc.c.HexCode,
                    Size = s.Name
                })
            .ToListAsync();

        return Ok(variants);
    }

    // POST: api/variants
    [HttpPost]
    public async Task<IActionResult> CreateVariant(ProductVariant variant)
    {
        var productExists = await _context.Products.AnyAsync(p => p.Id == variant.ProductId);

        if (!productExists)
            return BadRequest("Product does not exist");

        _context.ProductVariants.Add(variant);

        await _context.SaveChangesAsync();

        return Ok(variant);
    }

    // DELETE: api/variants/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVariant(int id)
    {
        var variant = await _context.ProductVariants.FindAsync(id);

        if (variant == null)
            return NotFound();

        _context.ProductVariants.Remove(variant);

        await _context.SaveChangesAsync();

        return Ok("Variant deleted");
    }
}