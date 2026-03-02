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
    base.OnModelCreating(modelBuilder);

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

    modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
    modelBuilder.Entity<Category>().HasIndex(c => c.Slug).IsUnique();
    modelBuilder.Entity<Product>().HasIndex(p => p.Slug).IsUnique();
    modelBuilder.Entity<ProductVariant>().HasIndex(p => p.Sku).IsUnique();
    modelBuilder.Entity<Order>().HasIndex(o => o.OrderCode).IsUnique();
    modelBuilder.Entity<Coupon>().HasIndex(c => c.Code).IsUnique();
    modelBuilder.Entity<Article>().HasIndex(a => a.Slug).IsUnique();
    modelBuilder.Entity<ArticleCategory>().HasIndex(a => a.Slug).IsUnique();

    /* =========================
       DEFAULT VALUES
    ========================== */

    modelBuilder.Entity<User>().Property(p => p.Role).HasDefaultValue("Customer");
    modelBuilder.Entity<User>().Property(p => p.IsLocked).HasDefaultValue(false);
    modelBuilder.Entity<User>().Property(p => p.CreatedAt).HasDefaultValueSql("GETDATE()");

    modelBuilder.Entity<Category>().Property(p => p.IsActive).HasDefaultValue(true);
    modelBuilder.Entity<CartItem>().Property(p => p.Quantity).HasDefaultValue(1);
    modelBuilder.Entity<Product>().Property(p => p.IsActive).HasDefaultValue(true);

    modelBuilder.Entity<ProductVariant>().Property(p => p.Quantity).HasDefaultValue(0);
    modelBuilder.Entity<ProductVariant>().Property(p => p.PriceModifier).HasDefaultValue(0m);

    modelBuilder.Entity<Promotion>().Property(p => p.IsActive).HasDefaultValue(true);
    modelBuilder.Entity<Promotion>().Property(p => p.Priority).HasDefaultValue(0);

    modelBuilder.Entity<Coupon>().Property(p => p.IsUsed).HasDefaultValue(false);
    modelBuilder.Entity<Coupon>().Property(p => p.CreatedAt).HasDefaultValueSql("GETDATE()");

    modelBuilder.Entity<Order>().Property(p => p.OrderDate).HasDefaultValueSql("GETDATE()");
    modelBuilder.Entity<Order>().Property(p => p.DiscountAmount).HasDefaultValue(0m);
    modelBuilder.Entity<Order>().Property(p => p.ShippingFee).HasDefaultValue(0m);
    modelBuilder.Entity<Order>().Property(p => p.PaymentStatus).HasDefaultValue("Unpaid");
    modelBuilder.Entity<Order>().Property(p => p.Status).HasDefaultValue(0);

    modelBuilder.Entity<OrderStatusHistory>().Property(p => p.Timestamp).HasDefaultValueSql("GETDATE()");
    modelBuilder.Entity<ProductImage>().Property(p => p.SortOrder).HasDefaultValue(0);
    modelBuilder.Entity<ProductReview>().Property(p => p.CreatedAt).HasDefaultValueSql("GETDATE()");
    modelBuilder.Entity<UserAddress>().Property(p => p.IsDefault).HasDefaultValue(false);
    modelBuilder.Entity<Notification>().Property(p => p.IsRead).HasDefaultValue(false);
    modelBuilder.Entity<Notification>().Property(p => p.CreatedAt).HasDefaultValueSql("GETDATE()");

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
            "[DiscountType]='FIXED_AMOUNT' OR [DiscountType]='PERCENTAGE'"));

    /* =========================
       RELATIONSHIPS (FULL SQL MATCH)
    ========================== */

    modelBuilder.Entity<Category>()
        .HasOne<Category>()
        .WithMany()
        .HasForeignKey(p => p.ParentId)
        .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<Product>()
        .HasOne<Category>()
        .WithMany()
        .HasForeignKey(p => p.CategoryId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<ProductVariant>()
        .HasOne<Product>()
        .WithMany()
        .HasForeignKey(p => p.ProductId)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<ProductVariant>()
        .HasOne<MasterColor>()
        .WithMany()
        .HasForeignKey(p => p.ColorId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<ProductVariant>()
        .HasOne<MasterSize>()
        .WithMany()
        .HasForeignKey(p => p.SizeId)
        .OnDelete(DeleteBehavior.NoAction);

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

    modelBuilder.Entity<Order>()
        .HasOne<User>()
        .WithMany()
        .HasForeignKey(p => p.UserId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<OrderDetail>()
        .HasOne<Order>()
        .WithMany()
        .HasForeignKey(p => p.OrderId)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<OrderDetail>()
        .HasOne<ProductVariant>()
        .WithMany()
        .HasForeignKey(p => p.ProductVariantId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<OrderStatusHistory>()
        .HasOne<Order>()
        .WithMany()
        .HasForeignKey(p => p.OrderId)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<CartItem>()
        .HasOne<User>()
        .WithMany()
        .HasForeignKey(p => p.UserId)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<CartItem>()
        .HasOne<Product>()
        .WithMany()
        .HasForeignKey(p => p.ProductId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<CartItem>()
        .HasOne<ProductVariant>()
        .WithMany()
        .HasForeignKey(p => p.ProductVariantId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<Notification>()
        .HasOne<User>()
        .WithMany()
        .HasForeignKey(p => p.UserId)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<Coupon>()
        .HasOne<User>()
        .WithMany()
        .HasForeignKey(p => p.UserId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<Coupon>()
        .HasOne<Promotion>()
        .WithMany()
        .HasForeignKey(p => p.PromotionId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<ProductReview>()
        .HasOne<User>()
        .WithMany()
        .HasForeignKey(p => p.UserId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<ProductReview>()
        .HasOne<Product>()
        .WithMany()
        .HasForeignKey(p => p.ProductId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<ProductReview>()
        .HasOne<Order>()
        .WithMany()
        .HasForeignKey(p => p.OrderId)
        .OnDelete(DeleteBehavior.NoAction);

    modelBuilder.Entity<PromotionCondition>()
        .HasOne<Promotion>()
        .WithMany()
        .HasForeignKey(p => p.PromotionId)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<UserAddress>()
        .HasOne<User>()
        .WithMany()
        .HasForeignKey(p => p.UserId)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<Article>()
        .HasOne<ArticleCategory>()
        .WithMany()
        .HasForeignKey(p => p.CategoryId)
        .OnDelete(DeleteBehavior.NoAction);

    /* =========================
       SEED DATA DEMO
    ========================== */
modelBuilder.Entity<User>().HasData(
    new User
    {
        Id = 1,
        Email = "admin@kantstore.com",
        FullName = "Admin",
        Role = "Admin"
    },
    new User
    {
        Id = 2,
        Email = "customer@gmail.com",
        FullName = "Customer 1",
        Role = "Customer"
    }
);

/* =========================
   SEED CATEGORY
========================= */

modelBuilder.Entity<Category>().HasData(
    new Category { Id = 1, Name = "Men", Slug = "men" },
    new Category { Id = 2, Name = "T-Shirts", Slug = "tshirts", ParentId = 1 }
);

/* =========================
   SEED PRODUCT
========================= */

modelBuilder.Entity<Product>().HasData(
    new Product
    {
        Id = 1,
        Name = "Basic T-Shirt",
        Slug = "basic-tshirt",
        Price = 199000,
        CategoryId = 2
    }
);

/* =========================
   SEED COLOR & SIZE
========================= */

modelBuilder.Entity<MasterColor>().HasData(
    new MasterColor { Id = 1, Name = "Black", HexCode = "#000000" }
);

modelBuilder.Entity<MasterSize>().HasData(
    new MasterSize { Id = 1, Name = "M" }
);

/* =========================
   SEED VARIANT
========================= */

modelBuilder.Entity<ProductVariant>().HasData(
    new ProductVariant
    {
        Id = 1,
        ProductId = 1,
        ColorId = 1,
        SizeId = 1,
        Sku = "TSHIRT-BLACK-M",
        Quantity = 50,
        PriceModifier = 0
    }
);

/* =========================
   SEED PROMOTION
========================= */

modelBuilder.Entity<Promotion>().HasData(
    new Promotion
    {
        Id = 1,
        Name = "Summer Sale",
        DiscountType = "PERCENTAGE",
        DiscountValue = 10,
        StartDate = new DateTime(2025,1,1),
        EndDate = new DateTime(2025,12,31),
        Priority = 1
    }
);
}
}