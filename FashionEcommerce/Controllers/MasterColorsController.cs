using FashionEcommerce.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FashionEcommerce.Controllers;

[Route("api/colors")]
[ApiController]
public class MasterColorsController : ControllerBase
{
    private readonly AppDbContext _context;

    public MasterColorsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetColors()
    {
        var colors = await _context.MasterColors.ToListAsync();

        return Ok(colors);
    }
}