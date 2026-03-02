using FashionEcommerceAPI.Data;
using FashionEcommerceAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FashionEcommerceAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Users/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (await _context.Users.AnyAsync(u => u.Email == user.Email))
            {
                return BadRequest("Email already exists.");
            }

            user.Id = Guid.NewGuid();
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            user.CreatedAt = DateTime.UtcNow;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully.");
        }

        // POST: api/Users/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginRequest)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.PasswordHash, user.PasswordHash))
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(new { Message = "Login successful", UserId = user.Id, Role = user.Role });
        }

        // GET: api/Users/profile/{id}
        [HttpGet("profile/{id}")]
        public async Task<IActionResult> GetProfile(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(new { user.Id, user.Username, user.Email, user.Role, user.IsLocked, user.CreatedAt });
        }

        // PUT: api/Users/lock/{id}
        [HttpPut("lock/{id}")]
        public async Task<IActionResult> LockUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.IsLocked = true;
            await _context.SaveChangesAsync();

            return Ok("User locked successfully.");
        }

        // PUT: api/Users/unlock/{id}
        [HttpPut("unlock/{id}")]
        public async Task<IActionResult> UnlockUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.IsLocked = false;
            await _context.SaveChangesAsync();

            return Ok("User unlocked successfully.");
        }

        // PUT: api/Users/assign-role/{id}
        [HttpPut("assign-role/{id}")]
        public async Task<IActionResult> AssignRole(Guid id, [FromBody] string role)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.Role = role;
            await _context.SaveChangesAsync();

            return Ok("Role assigned successfully.");
        }
    }
}