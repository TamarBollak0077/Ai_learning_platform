using BL.Interfaces;
using BL.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubCategoryController : ControllerBase
    {
        private readonly ISubCategoryService _subCategoryService;

        public SubCategoryController(ISubCategoryService subCategoryService)
        {
            _subCategoryService = subCategoryService;
        }

        [HttpGet("{categoryId}")]
        public async Task<ActionResult<IEnumerable<SubCategoryDTO>>> GetByCategoryId(int categoryId)
        {
            var subCategories = await _subCategoryService.GetByCategoryIdAsync(categoryId);
            return Ok(subCategories);
        }
    }
}
