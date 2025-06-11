using AutoMapper;
using BL.DTO.DTOs;
using BL.DTOs;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDTO>();  // מיפוי Entity ל-DTO
            CreateMap<CategoryDTO, Category>();  // מיפוי הפוך אם צריך

            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();

            CreateMap<SubCategory, SubCategoryDTO>();
            CreateMap<SubCategoryDTO, SubCategory>();

            CreateMap<Prompt, PromptDTO>();
            CreateMap<PromptDTO, Prompt>();


        }
    }
}
