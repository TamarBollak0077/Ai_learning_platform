using AutoMapper;
using BL.DTO.DTOs;
using BL.DTOs;
using DAL.Models;
using System.Linq;


namespace BL
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDTO>();
            CreateMap<CategoryDTO, Category>();

            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();

            CreateMap<SubCategory, SubCategoryDTO>();
            CreateMap<SubCategoryDTO, SubCategory>();

            // מיפוי מפורש לשדה Prompt
            CreateMap<Prompt, PromptDTO>()
                .ForMember(dest => dest.Prompt, opt => opt.MapFrom(src => src.Prompt1));
            CreateMap<PromptDTO, Prompt>()
                .ForMember(dest => dest.Prompt1, opt => opt.MapFrom(src => src.Prompt));
        }
    }
}