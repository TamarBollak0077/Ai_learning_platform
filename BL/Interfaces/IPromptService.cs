using BL.DTOs;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface IPromptService
    {
        Task<PromptDTO> SubmitPromptAsync(PromptDTO prompt); // עדיף
        Task<IEnumerable<PromptDTO>> GetByUserIdAsync(int userId);
        Task<IEnumerable<PromptDTO>> GetAllAsync(); // לשימוש עבור Admin
    }


}
