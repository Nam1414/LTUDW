using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FashionEcommerce.Models.DTOs;
using FashionEcommerce.Services.Interfaces;
using System.Security.Claims;

namespace FashionEcommerce.Controllers
{
    /// <summary>
    /// Controller xử lý các API liên quan đến User
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// POST /api/users/register - Đăng ký tài khoản mới
        /// </summary>
        [HttpPost("register")]
        [AllowAnonymous] // Cho phép truy cập không cần auth
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            // Validate model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.RegisterAsync(registerDTO);

            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            return Ok(new 
            { 
                message = result.Message, 
                user = result.User 
            });
        }

        /// <summary>
        /// POST /api/users/login - Đăng nhập
        /// </summary>
        [HttpPost("login")]
        [AllowAnonymous] // Cho phép truy cập không cần auth
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            // Validate model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.LoginAsync(loginDTO);

            if (!result.Success)
            {
                return Unauthorized(new { message = result.Message });
            }

            return Ok(result.Response);
        }

        /// <summary>
        /// GET /api/users/profile - Xem thông tin cá nhân
        /// </summary>
        [HttpGet("profile")]
        [Authorize] // Yêu cầu JWT token
        public async Task<IActionResult> GetProfile()
        {
            // Lấy UserId từ token
            var userId = GetCurrentUserId();

            var result = await _userService.GetProfileAsync(userId);

            if (!result.Success)
            {
                return NotFound(new { message = result.Message });
            }

            return Ok(result.User);
        }

        /// <summary>
        /// PUT /api/users/profile - Cập nhật thông tin cá nhân
        /// </summary>
        [HttpPut("profile")]
        [Authorize] // Yêu cầu JWT token
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDTO updateDTO)
        {
            // Validate model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Lấy UserId từ token
            var userId = GetCurrentUserId();

            var result = await _userService.UpdateProfileAsync(userId, updateDTO);

            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            return Ok(new 
            { 
                message = result.Message, 
                user = result.User 
            });
        }

        /// <summary>
        /// PUT /api/users/{id}/lock - Khóa tài khoản (Admin only)
        /// </summary>
        [HttpPut("{id}/lock")]
        [Authorize(Roles = "Admin")] // Chỉ Admin mới có thể khóa tài khoản
        public async Task<IActionResult> LockUser(int id)
        {
            // Lấy ID của admin đang thực hiện thao tác
            var adminId = GetCurrentUserId();

            var result = await _userService.LockUserAsync(id, adminId);

            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            return Ok(new { message = result.Message });
        }

        /// <summary>
        /// PUT /api/users/{id}/unlock - Mở khóa tài khoản (Admin only)
        /// </summary>
        [HttpPut("{id}/unlock")]
        [Authorize(Roles = "Admin")] // Chỉ Admin mới có thể mở khóa tài khoản
        public async Task<IActionResult> UnlockUser(int id)
        {
            // Lấy ID của admin đang thực hiện thao tác
            var adminId = GetCurrentUserId();

            var result = await _userService.UnlockUserAsync(id, adminId);

            if (!result.Success)
            {
                return BadRequest(new { message = result.Message });
            }

            return Ok(new { message = result.Message });
        }

        /// <summary>
        /// Helper method để lấy UserId từ JWT token
        /// </summary>
        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User ID not found in token");
            }
            return int.Parse(userIdClaim.Value);
        }
    }
}

