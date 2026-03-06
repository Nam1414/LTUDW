using LTUDW.Data;
using LTUDW.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LTUDW.Controllers;

[ApiController]
[Route("api/promotions")]
public class PromotionController : ControllerBase
{
    private readonly AppDbContext _context;

    public PromotionController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("product/{productId}")]
    public async Task<IActionResult> GetPromotionByProduct(int productId)
    {
        var promo = await _context.ProductPromotions
            .Include(p => p.Promotion)
            .Where(p => p.ProductId == productId)
            .Select(p => p.Promotion)
            .FirstOrDefaultAsync();

        if (promo == null)
            return Ok(null);

        return Ok(promo);
    }
}