using BL.DTO.DTOs;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface IUserService
    {
        Task<List<UserDTO>> GetAllUsersAsync();
        Task<UserDTO?> GetUserByIdAsync(int id);
        Task<UserDTO> CreateUserAsync(UserDTO userDto);
        Task<UserDTO> RegisterAsync(UserDTO userDto);
        Task<UserDTO?> GetByPhoneAsync(string phone);
    }


}
