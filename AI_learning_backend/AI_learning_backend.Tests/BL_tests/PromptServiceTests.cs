using Xunit;
using AutoMapper;
using DAL;
using DAL.Models;
using BL.Services;
using BL.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using BL.Interfaces;

[Trait("Category", "Unit Test")]
public class PromptServiceTests
{
    private readonly IMapper _mapper;

    public PromptServiceTests()
    {
        var config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<BL.MappingProfile>();
        });
        _mapper = config.CreateMapper();
    }

    [Fact(DisplayName = "SubmitPromptAsync saves and returns PromptDTO")]
    public async Task SubmitPromptAsync_ShouldSaveAndReturnPromptDTO()
    {
        var options = new DbContextOptionsBuilder<DBManager>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        await using var context = new TestDBManager(options); // ← שימוש ביורש

        context.Database.EnsureCreated();

        var service = new PromptService(context, _mapper);

        var promptDto = new PromptDTO
        {
            UserId = 1,
            CategoryId = 1,
            SubCategoryId = 1,
            Prompt = "Test prompt"
        };

        var result = await service.SubmitPromptAsync(promptDto);

        Assert.NotNull(result);
        Assert.Equal(promptDto.Prompt, result.Prompt);
    }

}
