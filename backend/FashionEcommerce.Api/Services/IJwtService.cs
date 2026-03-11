using FashionEcommerce.Api.Models;

namespace FashionEcommerce.Api.Services;

public interface IJwtService
{
    string GenerateToken(User user);
}
