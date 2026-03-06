using LTUDW.Data;
using LTUDW.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LTUDW.Controllers;
[ApiController]
[Route("api/coupons")]
public class CouponController : ControllerBase
{
    private readonly AppDbContext _context;

    public CouponController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("validate")]
    public async Task<IActionResult> ValidateCoupon([FromBody] string code)
    {
        var coupon = await _context.Coupons
            .Include(c => c.Promotion)
            .FirstOrDefaultAsync(c => c.Code == code);

        if (coupon == null)
            return BadRequest("Coupon not found");

        if (coupon.IsUsed)
            return BadRequest("Coupon already used");

        if (coupon.ExpiryDate < DateTime.Now)
            return BadRequest("Coupon expired");

        var promotion = coupon.Promotion;
        
        if (promotion == null)
        return BadRequest("Promotion not found");

        if (!promotion.IsActive)
            return BadRequest("Promotion inactive");

        if (promotion.StartDate > DateTime.Now || promotion.EndDate < DateTime.Now)
            return BadRequest("Promotion not valid");

        return Ok(new
        {
            coupon.Code,
            promotion.DiscountType,
            promotion.DiscountValue
        });
    }
}