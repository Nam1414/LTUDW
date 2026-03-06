using Microsoft.EntityFrameworkCore;
using LTUDW.Models;

namespace LTUDW.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


    // PRODUCTS
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductVariant> ProductVariants { get; set; }
    public DbSet<ProductImage> ProductImages { get; set; }

    // MASTER DATA
    public DbSet<MasterColor> MasterColors { get; set; }
    public DbSet<MasterSize> MasterSizes { get; set; }

    // PROMOTIONS
    public DbSet<Promotion> Promotions { get; set; }
    public DbSet<PromotionCondition> PromotionConditions { get; set; }
    public DbSet<ProductPromotion> ProductPromotions { get; set; }

    // COUPONS
    public DbSet<Coupon> Coupons { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Unique SKU
        modelBuilder.Entity<ProductVariant>()
            .HasIndex(p => p.Sku)
            .IsUnique();

        // Unique Coupon Code
        modelBuilder.Entity<Coupon>()
            .HasIndex(c => c.Code)
            .IsUnique();

        // Unique Product Slug
        modelBuilder.Entity<Product>()
            .HasIndex(p => p.Slug)
            .IsUnique();

        // Price precision
        modelBuilder.Entity<Product>()
            .Property(p => p.Price)
            .HasColumnType("decimal(18,2)");

        modelBuilder.Entity<ProductVariant>()
            .Property(p => p.PriceModifier)
            .HasColumnType("decimal(18,2)");

        modelBuilder.Entity<Promotion>()
            .Property(p => p.DiscountValue)
            .HasColumnType("decimal(18,2)");
    }
}