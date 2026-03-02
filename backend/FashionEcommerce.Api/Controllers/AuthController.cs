using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using FashionEcommerce.Api.Data;
using FashionEcommerce.Api.DTOs;
using FashionEcommerce.Api.Models;
using FashionEcommerce.Api.Services;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity.Data;

namespace FashionEcommerce.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IJwtService _jwtService;

    public AuthController(AppDbContext context, IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            return BadRequest("Email already exists");

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            FullName = dto.FullName,
            Role = "Customer",
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { Message = "User registered successfully" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email && !u.IsLocked);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized(new { Message = "Invalid credentials" });

        // Revoke old refresh tokens
        _context.RefreshTokens.Where(rt => rt.UserId == user.Id && !rt.IsRevoked).ToList().ForEach(rt => rt.IsRevoked = true);

        var accessToken = _jwtService.GenerateToken(user);
        var refreshToken = GenerateRefreshToken(user.Id);
        _context.RefreshTokens.Add(refreshToken);
        await _context.SaveChangesAsync();

        return Ok(new AuthResponse
        {
            Token = accessToken,
            RefreshToken = refreshToken.Token,
            UserId = user.Id,
            Email = user.Email,
            Role = user.Role
        });
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
    {
        var refreshToken = await _context.RefreshTokens
            .Include(rt => rt.User)
            .FirstOrDefaultAsync(rt => rt.Token == request.RefreshToken && !rt.IsRevoked && rt.ExpiresAt > DateTime.UtcNow);

        if (refreshToken == null) return Unauthorized("Invalid refresh token");

        var accessToken = _jwtService.GenerateToken(refreshToken.User);
        var newRefreshToken = GenerateRefreshToken(refreshToken.UserId);

        refreshToken.IsRevoked = true;
        _context.RefreshTokens.Add(newRefreshToken);
        await _context.SaveChangesAsync();

        return Ok(new AuthResponse
        {
            Token = accessToken,
            RefreshToken = newRefreshToken.Token
        });
    }

    private RefreshToken GenerateRefreshToken(int userId)
    {
        return new RefreshToken
        {
            UserId = userId,
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
            ExpiresAt = DateTime.UtcNow.AddDays(7)
        };
    }

}
