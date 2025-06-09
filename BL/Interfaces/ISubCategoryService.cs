using BL.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface ISubCategoryService
    {
        Task<IEnumerable<SubCategoryDTO>> GetByCategoryIdAsync(int categoryId);
    }

}
