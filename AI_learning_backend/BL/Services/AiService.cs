using BL.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BL.Services
{
    public class AiService : IAiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly ILogger<AiService> _logger;

        public AiService(HttpClient httpClient, IConfiguration config, ILogger<AiService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
            Console.WriteLine("OpenAI API Key starts with: " +
     (string.IsNullOrEmpty(_apiKey) ? "(empty)" : _apiKey.Substring(0, Math.Min(5, _apiKey.Length))));
        }

        public async Task<string> GetAiResponseAsync(string prompt)
        {
            _logger.LogInformation("Sending prompt to OpenAI: {Prompt}", prompt);

            var requestBody = new ChatRequest
            {
                Model = "gpt-3.5-turbo",
                Messages = new List<ChatMessage>
                {
                    new ChatMessage { Role = "user", Content = prompt }
                }
            };

            var json = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);

            int maxRetries = 5;
            int delay = 2000; // 2 שניות

            for (int attempt = 1; attempt <= maxRetries; attempt++)
            {
                try
                {
                    var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
                    _logger.LogInformation("OpenAI returned status: {StatusCode}", response.StatusCode);

                    if (response.StatusCode == System.Net.HttpStatusCode.TooManyRequests)
                    {
                        _logger.LogWarning("Rate limit exceeded (429). Retrying in {Delay}ms... (Attempt {Attempt}/{Max})", delay, attempt, maxRetries);
                        await Task.Delay(delay);
                        delay *= 2; // הכפלה גיאומטרית של זמן ההמתנה
                        continue;
                    }

                    response.EnsureSuccessStatusCode();

                    var responseStream = await response.Content.ReadAsStreamAsync();
                    var chatResponse = await JsonSerializer.DeserializeAsync<ChatResponse>(responseStream);

                    var answer = chatResponse?.Choices?.FirstOrDefault()?.Message?.Content?.Trim() ?? string.Empty;
                    _logger.LogInformation("Received response: {Response}", answer);

                    return answer;
                }
                catch (HttpRequestException ex)
                {
                    _logger.LogError(ex, "HTTP error while calling OpenAI API (Attempt {Attempt}/{Max})", attempt, maxRetries);
                    if (attempt == maxRetries)
                        throw;
                    await Task.Delay(delay);
                    delay *= 2;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Unexpected error in GetAiResponseAsync.");
                    throw;
                }
            }

            throw new Exception("Exceeded maximum retry attempts for OpenAI API call.");
        }

        // DTOs עבור הבקשה והתשובה
        public class ChatRequest
        {
            [JsonPropertyName("model")]
            public string Model { get; set; } = string.Empty;

            [JsonPropertyName("messages")]
            public List<ChatMessage> Messages { get; set; } = new();
        }

        public class ChatMessage
        {
            [JsonPropertyName("role")]
            public string Role { get; set; } = string.Empty;

            [JsonPropertyName("content")]
            public string Content { get; set; } = string.Empty;
        }

        public class ChatResponse
        {
            [JsonPropertyName("choices")]
            public List<ChatChoice> Choices { get; set; } = new();
        }

        public class ChatChoice
        {
            [JsonPropertyName("message")]
            public ChatMessage Message { get; set; } = new();
        }
    }
}