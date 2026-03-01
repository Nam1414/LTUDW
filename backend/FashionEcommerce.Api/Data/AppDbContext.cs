using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Api.Models;
using System.Reflection.Emit;

namespace FashionEcommerce.Api.Data;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;

    public AppContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModuleBuilder moduleBuilder)
    {
        base.OnModelCreating(moduleBuilder);

        // unique email
        moduleBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // seed admin user (password: Admin@123)
        moduleBuilder.Entity<User>().HasData(new User
        {
            Id = 1,
            Email = "admin@fashion.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
            FullName = "Admin User",
            Role = "Admin",
            IsLocked = false,
            CreatedAt = DateTime.UtcNow
        });
    }
}