using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Api.Data;
using FashionEcommerce.Api.Models;
using System.Security.Claims;

namespace FashionEcommerce.Api.Controllers;

[Authorize]  // All cần JWT
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context) => _context = context;

    [HttpGet("me")]
    public IActionResult GetProfile()
    {
        var userId = User.FindFirst("id")?.Value;
        return Ok(new { 
            userId,
            claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList(),
            isAuth = User.Identity?.IsAuthenticated
        });
    }

    // public async Task<IActionResult> GetProfile()
    // {
    //     // Claim name FULL từ token: http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier
    //     var userIdClaim = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
        
    //     if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
    //         return Unauthorized(new { error = "Invalid token - no user ID" });

    //     var user = await _context.Users.FindAsync(userId);
    //     if (user == null) return NotFound("User not found");
        
    //     return Ok(new { user.Id, user.Email, user.FullName, user.Role });
    // }


    [HttpGet("claims")]// GET /api/Users/claims
    public IActionResult GetClaims()
    {
        var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();
        return Ok(claims);
    }

    [Authorize(Roles = "Admin")]  // Chỉ admin
    [HttpGet]  // GET /api/Users
    public async Task<IActionResult> GetAll([FromQuery] int page = 1, int pageSize = 10)
    {
        var users = await _context.Users
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(u => new { u.Id, u.Email, u.FullName, u.Role, u.IsLocked })
            .ToListAsync();
        return Ok(users);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/lock")]  // PUT /api/Users/2/lock
    public async Task<IActionResult> LockUser(int id, [FromBody] bool isLocked)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();
        if (user.Id == 1) return BadRequest("Cannot lock admin");

        user.IsLocked = isLocked;
        await _context.SaveChangesAsync();
        return Ok(new { Message = $"User {user.Email} {(isLocked ? "locked" : "unlocked")}" });
    }
}
