using BL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AiController : ControllerBase
    {
        private readonly IAiService _aiService;

        public AiController(IAiService aiService)
        {
            _aiService = aiService;
        }

        [HttpPost("chat")]
        public async Task<ActionResult<string>> GetAiResponse([FromBody] string prompt)
        {
            var result = await _aiService.GetAiResponseAsync(prompt);
            return Ok(result);
        }
    }
}
