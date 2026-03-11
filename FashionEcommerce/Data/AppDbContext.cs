using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Models;
using FashionEcommerce.Models.Entities;

namespace FashionEcommerce.Data;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<RefreshToken> RefreshTokens { get; set; } = null!;
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Product> Products { get; set; } = null!;
    public DbSet<ProductImage> ProductImages { get; set; } = null!;
    public DbSet<CartItem> CartItems { get; set; } = null!;
    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<OrderDetail> OrderDetails { get; set; } = null!;
    public DbSet<OrderStatusHistory> OrderStatusHistories { get; set; } = null!;
    public DbSet<Notification> Notifications { get; set; } = null!;
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<ProductVariant> ProductVariants { get; set; } = null!;
    public DbSet<MasterColor> MasterColors { get; set; } = null!;
    public DbSet<MasterSize> MasterSizes { get; set; } = null!;
    public DbSet<Coupon> Coupons { get; set; } = null!;
    public DbSet<Promotion> Promotions { get; set; } = null!;
    public DbSet<ProductPromotion> ProductPromotions { get; set; } = null!;
    public DbSet<PromotionCondition> PromotionConditions { get; set; } = null!;


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
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Uncategorized", Slug = "uncategorized", IsActive = true }
        );

        modelBuilder.Entity<Product>().HasData
        (
            new Product { Id = 1, Name = "T-Shirt", Description = "Cotton T-Shirt", Price = 20m, Discount = 0m, Stock = 100, CreatedAt = DateTime.UtcNow, CategoryId = 1 },
            new Product { Id = 2, Name = "Jeans", Description = "Blue Jeans", Price = 50m, Discount = 10m, Stock = 50, CreatedAt = DateTime.UtcNow, CategoryId = 1 }
        );

        // Orders
        modelBuilder.Entity<Order>()
            .HasOne(o => o.User)
            .WithMany()
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Order>()
            .Property(o => o.TotalAmount).HasColumnType("decimal(18,2)");
        modelBuilder.Entity<Order>()
            .Property(o => o.DiscountAmount).HasColumnType("decimal(18,2)");
        modelBuilder.Entity<Order>()
            .Property(o => o.ShippingFee).HasColumnType("decimal(18,2)");
        modelBuilder.Entity<Order>()
            .Property(o => o.FinalAmount).HasColumnType("decimal(18,2)");

        // OrderDetails
        modelBuilder.Entity<OrderDetail>()
            .HasOne(od => od.Order)
            .WithMany(o => o.OrderDetails)
            .HasForeignKey(od => od.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<OrderDetail>()
            .HasOne(od => od.Product)
            .WithMany()
            .HasForeignKey(od => od.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<OrderDetail>()
            .Property(od => od.UnitPrice).HasColumnType("decimal(18,2)");
        modelBuilder.Entity<OrderDetail>()
            .Property(od => od.LineTotal).HasColumnType("decimal(18,2)");

        // OrderStatusHistory
        modelBuilder.Entity<OrderStatusHistory>()
            .HasOne(h => h.Order)
            .WithMany(o => o.StatusHistories)
            .HasForeignKey(h => h.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        //decimal precision (fix warnings)
        modelBuilder.Entity<Product>()
            .Property(p => p.Price).HasColumnType("decimal(18,2)");
            
        modelBuilder.Entity<Product>()
            .Property(p => p.Discount).HasColumnType("decimal(18,2)");

        modelBuilder.Entity<CartItem>()
            .Property(ci => ci.UnitPriceSnapshot).HasColumnType("decimal(18,2)");

        modelBuilder.Entity<ProductVariant>()
            .Property(pv => pv.PriceModifier).HasColumnType("decimal(18,2)");

        // Notification
        modelBuilder.Entity<Notification>()
            .HasOne(n => n.User)
            .WithMany()  // User không cần back-ref
            .HasForeignKey(n => n.UserId)  // int UserId → int User.Id
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Notification>()
            .Property(n => n.Type)
            .HasMaxLength(100);

        // Promotion
        modelBuilder.Entity<Promotion>()
            .Property(p => p.DiscountValue).HasColumnType("decimal(18,2)");

        // PromotionCondition
        modelBuilder.Entity<PromotionCondition>()
            .HasOne(pc => pc.Promotion)
            .WithMany(p => p.PromotionConditions)
            .HasForeignKey(pc => pc.PromotionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
