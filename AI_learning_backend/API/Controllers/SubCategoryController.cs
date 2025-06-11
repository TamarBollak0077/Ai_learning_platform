using BL.DTOs;
using BL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubCategoryController : ControllerBase
    {
        private readonly ISubCategoryService _subCategoryService;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public SubCategoryController(
            ISubCategoryService subCategoryService,
            IHttpClientFactory httpClientFactory,
            IConfiguration configuration)
        {
            _subCategoryService = subCategoryService;
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

       
        [HttpGet("{categoryId}")]
        public async Task<ActionResult<IEnumerable<SubCategoryDTO>>> GetByCategoryId(int categoryId)
        {
            var subCategories = await _subCategoryService.GetByCategoryIdAsync(categoryId);
            return Ok(subCategories);
        }


        [HttpPost("validate-prompt")]
        public async Task<IActionResult> ValidatePrompt([FromBody] ValidatePromptRequest request)
        {
            string prompt = $@"
הטקסט הבא הוא שאלה או בקשה של משתמש:
""{request.UserPrompt}""

האם הוא קשור לנושא '{request.CategoryName}' ותת־נושא '{request.SubCategoryName}'? 
ענה רק 'כן' או 'לא'.
";

            var httpClient = _httpClientFactory.CreateClient();
            var apiKey = _configuration["OpenAI:ApiKey"];
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var requestBody = new
            {
                model = "gpt-3.5-turbo",
                messages = new[]
                {
                    new { role = "user", content = prompt }
                },
                max_tokens = 3,
                temperature = 0
            };

            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);

            if (response.StatusCode == HttpStatusCode.TooManyRequests)
            {
                return StatusCode(429, "הגעת למגבלת שימוש ב-OpenAI. נסה שוב מאוחר יותר.");
            }
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                return StatusCode((int)response.StatusCode, $"OpenAI error: {error}");
            }
            var responseString = await response.Content.ReadAsStringAsync();
            Console.WriteLine("OpenAI response: " + responseString);

            try
            {
                using var doc = JsonDocument.Parse(responseString);
                string aiAnswer = doc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
                string answer = aiAnswer.Trim().ToLower();

                if (!(answer.StartsWith("כן") || answer.StartsWith("yes")))
                {
                    return BadRequest("הטקסט לא קשור לקטגוריה/תת־קטגוריה שנבחרה.");
                }

                return Ok("הטקסט תקין.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"OpenAI parse error: {ex.Message}. Response: {responseString}");
            }
        }
    }

    public class ValidatePromptRequest
    {
        public string UserPrompt { get; set; }
        public string CategoryName { get; set; }
        public string SubCategoryName { get; set; }
    }
}