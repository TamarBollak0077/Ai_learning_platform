using AutoMapper;
using BL.DTO.DTOs;
using BL.Interfaces;
using DAL;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL.Services
{
    public class UserService : IUserService
    {
        private readonly DBManager _context;
        private readonly IMapper _mapper;

        public UserService(DBManager context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<UserDTO>> GetAllUsersAsync()
        {
            var users = await _context.Users.ToListAsync();
            return _mapper.Map<List<UserDTO>>(users);
        }

        public async Task<UserDTO?> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return null;

            return _mapper.Map<UserDTO>(user);
        }

        public async Task<UserDTO> CreateUserAsync(UserDTO userDto)
        {
            var userEntity = _mapper.Map<User>(userDto);
            _context.Users.Add(userEntity);
            await _context.SaveChangesAsync();

            return _mapper.Map<UserDTO>(userEntity);
        }

        // רישום משתמש (אפשר להוסיף לוגיקה של הרשמה, ולידציה וכו')
        public async Task<UserDTO> RegisterAsync(UserDTO userDto)
        {
            // לדוגמה: לבדוק אם משתמש כבר קיים
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Phone == userDto.Phone);
            if (existingUser != null)
            {
                // אפשר לזרוק חריגה או להחזיר משתמש קיים לפי הצורך
                return _mapper.Map<UserDTO>(existingUser);
            }

            // יצירת משתמש חדש
            var newUser = _mapper.Map<User>(userDto);
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return _mapper.Map<UserDTO>(newUser);
        }
    }
}
