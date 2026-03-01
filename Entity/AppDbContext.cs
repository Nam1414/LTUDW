using Microsoft.EntityFrameworkCore;
using LTUDW.Models;

namespace LTUDW.Entity;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<UserAddress> UserAddresses { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<ProductVariant> ProductVariants { get; set; }
    public DbSet<MasterColor> MasterColors { get; set; }
    public DbSet<MasterSize> MasterSizes { get; set; }
    public DbSet<ProductImage> ProductImages { get; set; }
    public DbSet<ProductPromotion> ProductPromotions { get; set; }
    public DbSet<ProductReview> ProductReviews { get; set; }
    public DbSet<Promotion> Promotions { get; set; }
    public DbSet<PromotionCondition> PromotionConditions { get; set; }
    public DbSet<Coupon> Coupons { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderDetail> OrderDetails { get; set; }
    public DbSet<OrderStatusHistory> OrderStatusHistories { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Article> Articles { get; set; }
    public DbSet<ArticleCategory> ArticleCategories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        /* =========================
           DECIMAL PRECISION
        ========================== */

        modelBuilder.Entity<Product>()
            .Property(p => p.Price).HasPrecision(18, 2);

        modelBuilder.Entity<ProductVariant>()
            .Property(p => p.PriceModifier).HasPrecision(18, 2);

        modelBuilder.Entity<Order>()
            .Property(o => o.TotalAmount).HasPrecision(18, 2);

        modelBuilder.Entity<Order>()
            .Property(o => o.DiscountAmount).HasPrecision(18, 2);

        modelBuilder.Entity<Order>()
            .Property(o => o.ShippingFee).HasPrecision(18, 2);

        modelBuilder.Entity<Order>()
            .Property(o => o.FinalAmount).HasPrecision(18, 2);

        modelBuilder.Entity<OrderDetail>()
            .Property(o => o.UnitPrice).HasPrecision(18, 2);

        modelBuilder.Entity<Promotion>()
            .Property(p => p.DiscountValue).HasPrecision(18, 2);


        /* =========================
           UNIQUE INDEX
        ========================== */

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email).IsUnique();

        modelBuilder.Entity<Category>()
            .HasIndex(c => c.Slug).IsUnique();

        modelBuilder.Entity<Product>()
            .HasIndex(p => p.Slug).IsUnique();

        modelBuilder.Entity<ProductVariant>()
            .HasIndex(p => p.Sku).IsUnique();

        modelBuilder.Entity<Order>()
            .HasIndex(o => o.OrderCode).IsUnique();

        modelBuilder.Entity<Coupon>()
            .HasIndex(c => c.Code).IsUnique();

        modelBuilder.Entity<Article>()
            .HasIndex(a => a.Slug).IsUnique();

        modelBuilder.Entity<ArticleCategory>()
            .HasIndex(a => a.Slug).IsUnique();


        /* =========================
           CHECK CONSTRAINT
        ========================== */

        modelBuilder.Entity<ProductReview>()
            .ToTable(t => t.HasCheckConstraint(
                "CK_ProductReview_Rating",
                "[Rating] >= 1 AND [Rating] <= 5"));

        modelBuilder.Entity<Promotion>()
            .ToTable(t => t.HasCheckConstraint(
                "CK_Promotion_DiscountType",
                "[DiscountType] IN ('FIXED_AMOUNT','PERCENTAGE')"));


        /* =========================
           SELF REFERENCE CATEGORY
        ========================== */

        modelBuilder.Entity<Category>()
            .HasOne<Category>()
            .WithMany()
            .HasForeignKey(c => c.ParentId)
            .OnDelete(DeleteBehavior.Restrict);


        /* =========================
           CASCADE DELETE
        ========================== */

        modelBuilder.Entity<CartItem>()
            .HasOne<User>()
            .WithMany()
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProductVariant>()
            .HasOne<Product>()
            .WithMany()
            .HasForeignKey(p => p.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProductImage>()
            .HasOne<Product>()
            .WithMany()
            .HasForeignKey(p => p.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProductPromotion>()
            .HasOne<Product>()
            .WithMany()
            .HasForeignKey(p => p.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProductPromotion>()
            .HasOne<Promotion>()
            .WithMany()
            .HasForeignKey(p => p.PromotionId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<OrderDetail>()
            .HasOne<Order>()
            .WithMany()
            .HasForeignKey(o => o.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<OrderStatusHistory>()
            .HasOne<Order>()
            .WithMany()
            .HasForeignKey(o => o.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserAddress>()
            .HasOne<User>()
            .WithMany()
            .HasForeignKey(u => u.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Notification>()
            .HasOne<User>()
            .WithMany()
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PromotionCondition>()
            .HasOne<Promotion>()
            .WithMany()
            .HasForeignKey(p => p.PromotionId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Order>()
            .HasOne<User>()
            .WithMany()
            .HasForeignKey(o => o.UserId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}