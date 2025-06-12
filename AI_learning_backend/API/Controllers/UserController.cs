using BL.DTO.DTOs;
using BL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly string _adminPhone;
        private readonly IConfiguration _configuration;

        public UserController(IUserService userService, IConfiguration config)
        {
            _userService = userService;
            _adminPhone = config["AdminPhone"];
            _configuration = config;
        }

        // GET: api/User
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        // POST: api/User
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] UserDTO userDto)
        {
            if (userDto == null)
                return BadRequest("User data is null.");

            var createdUser = await _userService.CreateUserAsync(userDto);
            return CreatedAtAction(nameof(GetAllUsers), new { id = createdUser.Id }, createdUser);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDTO userDto)
        {
            if (userDto == null || string.IsNullOrEmpty(userDto.Phone))
                return BadRequest("Phone is required.");

            var user = await _userService.GetByPhoneAsync(userDto.Phone);
            if (user == null)
                return Unauthorized();

            bool isAdmin = user.Phone == _adminPhone;
            var token = GenerateJwtToken(user, isAdmin);

            return Ok(new
            {
                user.Id,
                user.Name,
                user.Phone,
                IsAdmin = isAdmin,
                Token = token
            });
        }

        private string GenerateJwtToken(UserDTO user, bool isAdmin)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name ?? ""),
                new Claim(ClaimTypes.MobilePhone, user.Phone ?? ""),
                new Claim(ClaimTypes.Role, isAdmin ? "Admin" : "User")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
