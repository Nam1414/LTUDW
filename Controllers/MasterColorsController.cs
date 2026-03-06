using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LTUDW.Entity;
using LTUDW.Models;

namespace LTUDW.Controllers;

[ApiController]
[Route("api/colors")]
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