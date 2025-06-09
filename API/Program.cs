using BL;
using BL.Services; // שנה לפי שם הניימספייס של ה-DbContext שלך  
using BL.Interfaces;
using DAL;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


var builder = WebApplication.CreateBuilder(args);

// רישום AutoMapper עם פרופיל ה-Mapping  
builder.Services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfile>());
            // Use typeof(MappingProfile) to resolve ambiguity  
// Fix for CS0121: Specify the type explicitly to resolve ambiguity  

builder.Services.AddDbContext<DBManager>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ISubCategoryService, SubCategoryService>();
builder.Services.AddScoped<IPromptService, PromptService>();
builder.Services.AddHttpClient<IAiService, AiService>();



// Add services to the container.  
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.  
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
