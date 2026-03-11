using FashionEcommerce.Models;

namespace FashionEcommerce.Services;

public interface IJwtService
{
    string GenerateToken(User user);
}
