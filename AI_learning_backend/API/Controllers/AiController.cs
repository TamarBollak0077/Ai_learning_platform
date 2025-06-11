using BL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AiController : ControllerBase
{
    private readonly IAiService _aiService;
    private readonly ILogger<AiController> _logger;

    public AiController(IAiService aiService, ILogger<AiController> logger)
    {
        _aiService = aiService;
        _logger = logger;

    }

    [HttpPost("chat")]
    public async Task<IActionResult> GetAiResponse([FromBody] PromptRequest req)
    {
        try
        {
            var result = await _aiService.GetAiResponseAsync(req.Prompt);
            return Ok(result);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "OpenAI API error");
            return StatusCode(503, "The AI service is currently unavailable. Please try again later.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error");
            return StatusCode(500, "An unexpected error occurred.");
        }
    }
}

public class PromptRequest
{
    public string Prompt { get; set; }
}
