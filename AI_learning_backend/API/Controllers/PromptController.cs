using BL.Interfaces;
using BL.DTOs;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        public async Task<ActionResult<PromptDTO>> SubmitPrompt([FromBody] PromptDTO prompt)
        {
            var result = await _promptService.SubmitPromptAsync(prompt);
            return Ok(result);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<PromptDTO>>> GetByUserId(int userId)
        {
            var prompts = await _promptService.GetByUserIdAsync(userId);
            return Ok(prompts);
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<PromptDTO>>> GetAll()
        {
            var prompts = await _promptService.GetAllAsync();
            return Ok(prompts);
        }
    }
}
