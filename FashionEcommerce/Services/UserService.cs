using BCrypt.Net;
using FashionEcommerce.Helpers;
using FashionEcommerce.Models.DTOs;
using FashionEcommerce.Models;
using FashionEcommerce.Repositories.Interfaces;
using FashionEcommerce.Services.Interfaces;

namespace FashionEcommerce.Services
{
    /// <summary>
    /// Service implementation cho User - xử lý business logic
    /// </summary>
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtHelper _jwtHelper;
        private readonly IConfiguration _configuration;

        public UserService(
            IUserRepository userRepository, 
            JwtHelper jwtHelper,
            IConfiguration configuration)
        {
            _userRepository = userRepository;
            _jwtHelper = jwtHelper;
            _configuration = configuration;
        }

        /// <inheritdoc/>
        public async Task<(bool Success, string Message, UserDTO? User)> RegisterAsync(RegisterDTO registerDTO)
        {
            // 1. Kiểm tra email đã tồn tại chưa
            if (await _userRepository.EmailExistsAsync(registerDTO.Email))
            {
                return (false, "Email đã được sử dụng", null);
            }

            // 2. Tạo User entity mới
            // Lưu ý: Role và CreatedAt sẽ được database tự động gán giá trị mặc định
            var user = new User
            {
                Email = registerDTO.Email.Trim().ToLower(),
                Username = registerDTO.Username?.Trim(),
                // Sử dụng BCrypt để hash mật khẩu
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDTO.Password),
                FullName = registerDTO.FullName?.Trim(),
                PhoneNumber = registerDTO.PhoneNumber?.Trim()
                // Role và CreatedAt sẽ dùng giá trị mặc định từ database
            };

            // 3. Lưu vào database
            var createdUser = await _userRepository.CreateAsync(user);

            // 4. Convert sang DTO và trả về
            var userDTO = MapToUserDTO(createdUser);
            return (true, "Đăng ký thành công", userDTO);
        }

        /// <inheritdoc/>
        public async Task<(bool Success, string Message, LoginResponseDTO? Response)> LoginAsync(LoginDTO loginDTO)
        {
            // 1. Tìm user theo email
            var user = await _userRepository.GetByEmailAsync(loginDTO.Email);
            if (user == null)
            {
                return (false, "Email hoặc mật khẩu không đúng", null);
            }

            // 2. Kiểm tra tài khoản có bị khóa không
            if (user.IsLocked)
            {
                return (false, "Tài khoản đã bị khóa. Vui lòng liên hệ Admin.", null);
            }

            // 3. Kiểm tra mật khẩu với BCrypt
            if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.PasswordHash))
            {
                return (false, "Email hoặc mật khẩu không đúng", null);
            }

            // 4. Tạo JWT Token
            var token = _jwtHelper.GenerateToken(user);
            var expirationMinutes = int.Parse(_configuration["Jwt:ExpirationMinutes"] ?? "60");

            // 5. Tạo response
            var response = new LoginResponseDTO
            {
                Token = token,
                ExpiresIn = expirationMinutes,
                User = MapToUserDTO(user)
            };

            return (true, "Đăng nhập thành công", response);
        }

        /// <inheritdoc/>
        public async Task<(bool Success, string Message, UserDTO? User)> GetProfileAsync(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                return (false, "Không tìm thấy người dùng", null);
            }

            return (true, "Lấy thông tin thành công", MapToUserDTO(user));
        }

        /// <inheritdoc/>
        public async Task<(bool Success, string Message, UserDTO? User)> UpdateProfileAsync(int userId, UpdateProfileDTO updateDTO)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                return (false, "Không tìm thấy người dùng", null);
            }

            // Cập nhật thông tin (chỉ cập nhật các trường được cung cấp)
            if (!string.IsNullOrWhiteSpace(updateDTO.FullName))
            {
                user.FullName = updateDTO.FullName.Trim();
            }

            if (!string.IsNullOrWhiteSpace(updateDTO.PhoneNumber))
            {
                user.PhoneNumber = updateDTO.PhoneNumber.Trim();
            }

            // Lưu vào database
            var updatedUser = await _userRepository.UpdateAsync(user);

            return (true, "Cập nhật thông tin thành công", MapToUserDTO(updatedUser));
        }

        /// <inheritdoc/>
        public async Task<(bool Success, string Message)> LockUserAsync(int userId, int adminId)
        {
            // Admin không thể tự khóa chính mình
            if (userId == adminId)
            {
                return (false, "Bạn không thể khóa tài khoản của chính mình");
            }

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                return (false, "Không tìm thấy người dùng");
            }

            // Không thể khóa Admin khác
            if (user.Role == "Admin")
            {
                return (false, "Không thể khóa tài khoản Admin");
            }

            if (user.IsLocked)
            {
                return (false, "Tài khoản đã bị khóa trước đó");
            }

            user.IsLocked = true;
            await _userRepository.UpdateAsync(user);

            return (true, "Khóa tài khoản thành công");
        }

        /// <inheritdoc/>
        public async Task<(bool Success, string Message)> UnlockUserAsync(int userId, int adminId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                return (false, "Không tìm thấy người dùng");
            }

            if (!user.IsLocked)
            {
                return (false, "Tài khoản đang hoạt động, không cần mở khóa");
            }

            user.IsLocked = false;
            await _userRepository.UpdateAsync(user);

            return (true, "Mở khóa tài khoản thành công");
        }

        /// <inheritdoc/>
        public async Task<(bool Success, string Message, UserDTO? User)> GetUserByIdAsync(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                return (false, "Không tìm thấy người dùng", null);
            }

            return (true, "Lấy thông tin thành công", MapToUserDTO(user));
        }

        /// <summary>
        /// Helper method để map User entity sang UserDTO
        /// </summary>
        private static UserDTO MapToUserDTO(User user)
        {
            return new UserDTO
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                GoogleId = user.GoogleId,
                DateOfBirth = user.DateOfBirth,
                FullName = user.FullName,
                PhoneNumber = user.PhoneNumber,
                AvatarUrl = user.AvatarUrl,
                Role = user.Role,
                IsLocked = user.IsLocked,
                CreatedAt = user.CreatedAt
            };
        }
    }
}
