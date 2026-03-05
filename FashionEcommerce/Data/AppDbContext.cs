using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Models.Entities;

namespace FashionEcommerce.Data
{
    /// <summary>
    /// DbContext - Đại diện cho phiên làm việc với database
    /// </summary>
    public class AppDbContext : DbContext
    {
        // Constructor nhận DbContextOptions để cấu hình từ Program.cs
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // DbSet cho các Entity
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }

        /// <summary>
        /// Cấu hình model khi Fluent API được sử dụng
        /// </summary>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Cấu hình User Entity
            modelBuilder.Entity<User>(entity =>
            {
                // Email là duy nhất
                entity.HasIndex(u => u.Email).IsUnique();

                // Mặc định role là Customer
                entity.Property(u => u.Role).HasDefaultValue("Customer");
                
                // Mặc định IsLocked là false
                entity.Property(u => u.IsLocked).HasDefaultValue(false);
            });

            // Cấu hình Category Entity
            modelBuilder.Entity<Category>(entity =>
            {
                // Slug là duy nhất
                entity.HasIndex(c => c.Slug).IsUnique();

                // Cấu hình self-referencing relationship
                entity.HasOne(c => c.Parent)
                    .WithMany(c => c.Children)
                    .HasForeignKey(c => c.ParentId)
                    .OnDelete(DeleteBehavior.Restrict);

                // Mặc định IsActive là true
                entity.Property(c => c.IsActive).HasDefaultValue(true);
            });

            // Cấu hình Product Entity
            modelBuilder.Entity<Product>(entity =>
            {
                // Slug là duy nhất
                entity.HasIndex(p => p.Slug).IsUnique();

                // Cấu hình relationship với Category
                entity.HasOne(p => p.Category)
                    .WithMany(c => c.Products)
                    .HasForeignKey(p => p.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);

                // Mặc định IsActive là true
                entity.Property(p => p.IsActive).HasDefaultValue(true);
            });
        }
    }
}

