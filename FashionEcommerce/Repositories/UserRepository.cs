using Microsoft.EntityFrameworkCore;
using FashionEcommerce.Data;
using FashionEcommerce.Models.Entities;
using FashionEcommerce.Repositories.Interfaces;

namespace FashionEcommerce.Repositories
{
    /// <summary>
    /// Repository implementation cho User - thao tác trực tiếp với database
    /// </summary>
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        /// <inheritdoc/>
        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
        }

        /// <inheritdoc/>
        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        /// <inheritdoc/>
        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users
                .AnyAsync(u => u.Email.ToLower() == email.ToLower());
        }

        /// <inheritdoc/>
        public async Task<User> CreateAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        /// <inheritdoc/>
        public async Task<User> UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        /// <inheritdoc/>
        public async Task<List<User>> GetAllAsync(int page = 1, int pageSize = 10)
        {
            return await _context.Users
                .OrderByDescending(u => u.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
    }
}

