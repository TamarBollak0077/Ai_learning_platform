using BL.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface ISubCategoryService
    {
        Task<IEnumerable<SubCategoryDTO>> GetAllAsync();
        Task<IEnumerable<SubCategoryDTO>> GetByCategoryIdAsync(int categoryId);
        // Ensure no new abstract methods are added during runtime debugging
    }
}