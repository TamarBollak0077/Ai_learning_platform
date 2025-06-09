using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Configuration;
using BL.Interfaces;

namespace BL.Services
{
    public class AiService : IAiService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public AiService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _apiKey = config["OPENAI_API_KEY"] ?? throw new Exception("Missing API key");
        }

        public async Task<string> GetAiResponseAsync(string prompt)
        {
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

            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
            response.EnsureSuccessStatusCode();

            var responseStream = await response.Content.ReadAsStreamAsync();
            var chatResponse = await JsonSerializer.DeserializeAsync<ChatResponse>(responseStream);

            return chatResponse?.Choices?.FirstOrDefault()?.Message?.Content?.Trim() ?? string.Empty;
        }
    }

    // DTOs עבור הבקשה והתשובה
    public class ChatRequest
    {
        [JsonPropertyName("model")]
        public string Model { get; set; }

        [JsonPropertyName("messages")]
        public List<ChatMessage> Messages { get; set; }
    }

    public class ChatMessage
    {
        [JsonPropertyName("role")]
        public string Role { get; set; }

        [JsonPropertyName("content")]
        public string Content { get; set; }
    }

    public class ChatResponse
    {
        [JsonPropertyName("choices")]
        public List<ChatChoice> Choices { get; set; }
    }

    public class ChatChoice
    {
        [JsonPropertyName("message")]
        public ChatMessage Message { get; set; }
    }
}
