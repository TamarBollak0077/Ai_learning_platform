using AutoMapper;
using BL.DTOs;
using BL.Interfaces;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Services
{
    public class SubCategoryService : ISubCategoryService
    {
        private readonly DBManager _context;
        private readonly IMapper _mapper;

        public SubCategoryService(DBManager context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<SubCategoryDTO>> GetAllAsync()
        {
            var subCategories = await _context.SubCategories.ToListAsync();
            return _mapper.Map<IEnumerable<SubCategoryDTO>>(subCategories);
        }

        public async Task<IEnumerable<SubCategoryDTO>> GetByCategoryIdAsync(int categoryId)
        {
            var subCategories = await _context.SubCategories
                .Where(sc => sc.CategoryId == categoryId)
                .ToListAsync();

            return _mapper.Map<IEnumerable<SubCategoryDTO>>(subCategories);
        }



    }
}
