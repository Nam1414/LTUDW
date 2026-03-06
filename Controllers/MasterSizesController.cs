using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LTUDW.Entity;
using LTUDW.Models;

namespace LTUDW.Controllers;

[ApiController]
[Route("api/sizes")]
public class MasterSizesController : ControllerBase
{
    private readonly AppDbContext _context;

    public MasterSizesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetSizes()
    {
        var sizes = await _context.MasterSizes.ToListAsync();
        return Ok(sizes);
    }
}