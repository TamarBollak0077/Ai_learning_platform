using AutoMapper;
using DAL.Models;
using BL.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BL.Interfaces;

namespace BL.Services
{
    public class PromptService : IPromptService
    {
        private readonly DBManager _context;
        private readonly IMapper _mapper;

        public PromptService(DBManager context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PromptDTO> SubmitPromptAsync(PromptDTO promptDto)
        {
            var prompt = _mapper.Map<Prompt>(promptDto);
            prompt.CreatedAt = DateTime.UtcNow;

            _context.Prompts.Add(prompt);
            await _context.SaveChangesAsync();

            return _mapper.Map<PromptDTO>(prompt);
        }


        public async Task<IEnumerable<PromptDTO>> GetByUserIdAsync(int userId)
        {
            var prompts = await _context.Prompts
                .Where(p => p.UserId == userId)
                .ToListAsync();

            return _mapper.Map<IEnumerable<PromptDTO>>(prompts);
        }

        public async Task<IEnumerable<PromptDTO>> GetAllAsync()
        {
            var prompts = await _context.Prompts.ToListAsync();
            return _mapper.Map<IEnumerable<PromptDTO>>(prompts);
        }


    }
}
