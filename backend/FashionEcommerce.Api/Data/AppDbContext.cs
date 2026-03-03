using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Api.Models;

namespace FashionEcommerce.Api.Data;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<RefreshToken> RefreshTokens { get; set; } = null!;
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Product> Products { get; set; } = null!;
    public DbSet<ProductImage> ProductImages { get; set; } = null!;
    public DbSet<CartItem> CartItems { get; set; } = null!;

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

        modelBuilder.Entity<RefreshToken>()
            .HasOne(rt => rt.User)
            .WithMany(u => u.RefreshTokens)
            .HasForeignKey(rt => rt.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        
        // Product - ProductImage
        modelBuilder.Entity<ProductImage>()
            .HasOne(pi => pi.Product)
            .WithMany(p => p.Images)
            .HasForeignKey(pi => pi.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
        
        // CartItems
        modelBuilder.Entity<CartItem>()
            .HasOne(ci => ci.User)
            .WithMany()
            .HasForeignKey(ci => ci.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<CartItem>()
            .HasOne(ci => ci.Product)
            .WithMany(p => p.CartItems)
            .HasForeignKey(ci => ci.ProductId)
            .OnDelete(DeleteBehavior.Restrict);  // Không xóa product nếu có cart
        
        //seed product
        modelBuilder.Entity<Product>().HasData
        (
            new Product { Id = 1, Name = "T-Shirt", Description = "Cotton T-Shirt", Price = 20m, Discount = 0m, Stock = 100, CreatedAt = DateTime.UtcNow },
            new Product { Id = 2, Name = "Jeans", Description = "Blue Jeans", Price = 50m, Discount = 10m, Stock = 50, CreatedAt = DateTime.UtcNow }
        );

        //decimal precision (fix warnings)
        modelBuilder.Entity<Product>()
            .Property(p => p.Price).HasColumnType("decimal(18,2)");
            
        modelBuilder.Entity<Product>()
            .Property(p => p.Discount).HasColumnType("decimal(18,2)");

        modelBuilder.Entity<CartItem>()
            .Property(ci => ci.UnitPriceSnapshot).HasColumnType("decimal(18,2)");
    }
}
