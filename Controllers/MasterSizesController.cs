using LTUDW.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LTUDW.Controllers;

[Route("api/sizes")]
[ApiController]
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