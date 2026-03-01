using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Api.Models;

namespace FashionEcommerce.Api.Data;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)  // ← Fix param + override
    {
        base.OnModelCreating(modelBuilder);
        
        // Unique Email
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
        
        // Seed admin (password: Admin123)
        modelBuilder.Entity<User>().HasData(new User
        {
            Id = 1,
            Email = "admin@fashion.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123"),
            FullName = "Admin User",
            Role = "Admin",
            IsLocked = false,
            CreatedAt = DateTime.UtcNow
        });
    }
}
