using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FashionEcommerce.Models;

namespace FashionEcommerce.Helpers
{
    /// <summary>
    /// Helper class để tạo và validate JWT Token
    /// </summary>
    public class JwtHelper
    {
        private readonly IConfiguration _configuration;

        public JwtHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Tạo JWT Token cho người dùng
        /// </summary>
        /// <param name="user">Thông tin người dùng</param>
        /// <returns>JWT Token string</returns>
        public string GenerateToken(User user)
        {
            // Lấy thông tin cấu hình JWT từ appsettings.json
            var secretKey = _configuration["Jwt:SecretKey"] ?? throw new ArgumentNullException("Jwt:SecretKey is not configured");
            var issuer = _configuration["Jwt:Issuer"] ?? "FashionEcommerceAPI";
            var audience = _configuration["Jwt:Audience"] ?? "FashionEcommerceClient";
            var expirationMinutes = int.Parse(_configuration["Jwt:ExpirationMinutes"] ?? "60");

            // Tạo security key từ secret key
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Tạo các claims chứa thông tin người dùng
            var claims = new[]
            {
                // Claim cho UserId
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                // Claim cho Email
                new Claim(ClaimTypes.Email, user.Email),
                // Claim cho Role
                new Claim(ClaimTypes.Role, user.Role),
                // Claim tùy chỉnh cho FullName
                new Claim("FullName", user.FullName ?? ""),
                // JTI (JWT ID) - unique identifier cho token
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            // Tạo token descriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(expirationMinutes),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = credentials
            };

            // Tạo token handler
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        /// <summary>
        /// Lấy UserId từ ClaimsPrincipal
        /// </summary>
        public int GetUserId(ClaimsPrincipal user)
        {
            var userIdClaim = user.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User ID not found in token");
            }
            return int.Parse(userIdClaim.Value);
        }

        /// <summary>
        /// Lấy Role từ ClaimsPrincipal
        /// </summary>
        public string GetUserRole(ClaimsPrincipal user)
        {
            var roleClaim = user.FindFirst(ClaimTypes.Role);
            return roleClaim?.Value ?? string.Empty;
        }

        /// <summary>
        /// Kiểm tra xem user có phải là Admin không
        /// </summary>
        public bool IsAdmin(ClaimsPrincipal user)
        {
            return GetUserRole(user) == "Admin";
        }
    }
}

