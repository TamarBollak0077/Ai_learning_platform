using Xunit;
using Moq;
using BL.Interfaces;
using BL.DTOs;
using API.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

public class PromptControllerTests
{
    private readonly Mock<IPromptService> _mockService;
    private readonly PromptController _controller;

    public PromptControllerTests()
    {
        _mockService = new Mock<IPromptService>();
        _controller = new PromptController(_mockService.Object);
    }

    [Fact(DisplayName = "Unit Test - SubmitPrompt returns OK with result")]
    [Trait("Category", "Unit Test")]
    public async Task SubmitPrompt_ReturnsOkWithResult()
    {
        // Arrange
        var promptDto = new PromptDTO { Prompt = "Test prompt", UserId = 1 };
        _mockService.Setup(s => s.SubmitPromptAsync(promptDto)).ReturnsAsync(promptDto);

        // Act
        var result = await _controller.SubmitPrompt(promptDto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedPrompt = Assert.IsType<PromptDTO>(okResult.Value);
        Assert.Equal("Test prompt", returnedPrompt.Prompt);
    }

    [Fact(DisplayName = "Unit Test - SubmitPrompt returns BadRequest if ModelState is invalid")]
    [Trait("Category", "Unit Test")]
    public async Task SubmitPrompt_InvalidModel_ReturnsBadRequest()
    {
        // Arrange
        _controller.ModelState.AddModelError("Prompt", "Required");

        // Act
        var result = await _controller.SubmitPrompt(new PromptDTO());

        // Assert
        Assert.IsType<BadRequestObjectResult>(result.Result);
    }
}
