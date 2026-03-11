using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Api.Data;
using FashionEcommerce.Api.Models;
using BCrypt.Net;  // Password hash

[Authorize]
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
            isAuth = User.Identity?.IsAuthenticated ?? false
        });
    }

    [HttpGet("claims")]
    public IActionResult GetClaims()
    {
        var claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList();
        return Ok(claims);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]  
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
    [HttpGet("{id}")]  
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _context.Users
            .Where(u => u.Id == id)
            .Select(u => new { u.Id, u.Email, u.FullName, u.Role, u.IsLocked })
            .FirstOrDefaultAsync();
        return user == null ? NotFound() : Ok(user);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]  
    public async Task<IActionResult> CreateUser([FromBody] CreateUserDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            return BadRequest("Email already exists");

        var user = new User
        {
            Email = dto.Email,
            FullName = dto.FullName,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "Customer",
            IsLocked = false,
            CreatedAt = DateTime.UtcNow
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, 
            new { id = user.Id, email = user.Email, fullName = user.FullName });
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}/lock")]
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

// DTO
public class CreateUserDto
{
    public string Email { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
