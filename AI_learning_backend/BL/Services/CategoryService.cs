using AutoMapper; // ודא שאתה משתמש באוטומפר
using BL.DTO.DTOs;
using BL.DTOs;
using BL.Interfaces;
using BL.Services;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly DBManager _context;
        private readonly IMapper _mapper;

        public CategoryService(DBManager context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CategoryDTO>> GetAllAsync()
        {
            var categories = await _context.Categories.ToListAsync();
            return _mapper.Map<IEnumerable<CategoryDTO>>(categories);
        }
    }
}
