using BL.DTOs;
using BL.Interfaces;
using BL.Services;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PromptController : ControllerBase
    {
        private readonly IPromptService _promptService;

        public PromptController(IPromptService promptService)
        {
            _promptService = promptService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<PromptDTO>> SubmitPrompt([FromBody] PromptDTO prompt)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _promptService.SubmitPromptAsync(prompt);
            return Ok(result);
        }





        [Authorize]
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<PromptDTO>>> GetByUserId(int userId)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out var currentUserId))
            {
                return Unauthorized();
            }


            var prompts = await _promptService.GetByUserIdAsync(userId);
            return Ok(prompts);
        }


        [Authorize]
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<PromptDTO>>> GetAll()
        {
            if (!User.IsInRole("Admin"))
            {
                return Forbid();
            }
            var prompts = await _promptService.GetAllAsync();
            return Ok(prompts);
        }
    }
}
