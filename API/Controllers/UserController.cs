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
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/User
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        // POST: api/User
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserDTO userDto)
        {
            if (userDto == null)
                return BadRequest("User data is null.");

            var createdUser = await _userService.CreateUserAsync(userDto);
            return CreatedAtAction(nameof(GetAllUsers), new { id = createdUser.Id }, createdUser);
        }
    }
}
