using Microsoft.EntityFrameworkCore;
using LTUDW.Models;

namespace LTUDW.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }

    public DbSet<ProductImage> ProductImages { get; set; }

    public DbSet<ProductVariant> ProductVariants { get; set; }

    public DbSet<MasterColor> MasterColors { get; set; }

    public DbSet<MasterSize> MasterSizes { get; set; }
    public DbSet<Promotion> Promotions { get; set; }
    public DbSet<PromotionCondition> PromotionConditions { get; set; }
    public DbSet<Coupon> Coupons { get; set; }
    public DbSet<ProductPromotion> ProductPromotions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // decimal precision
        modelBuilder.Entity<Product>()
            .Property(p => p.Price)
            .HasColumnType("decimal(18,2)");

        modelBuilder.Entity<ProductVariant>()
            .Property(v => v.PriceModifier)
            .HasColumnType("decimal(18,2)");

        // unique sku
        modelBuilder.Entity<ProductVariant>()
            .HasIndex(v => v.Sku)
            .IsUnique();
    }
}