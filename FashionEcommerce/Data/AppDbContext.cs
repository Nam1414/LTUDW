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
        }
    }
}

