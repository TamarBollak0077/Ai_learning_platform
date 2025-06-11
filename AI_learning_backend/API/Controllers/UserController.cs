using Microsoft.AspNetCore.Mvc;
using BL.DTO.DTOs;
using BL.Interfaces;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly string _adminPhone;
        public UserController(IUserService userService, IConfiguration config)
        {
            _userService = userService;
            _adminPhone = config["AdminPhone"];
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

            return Ok(new
            {
                user.Id,
                user.Name,
                user.Phone,
                IsAdmin = isAdmin
            });
        }
    }
}
