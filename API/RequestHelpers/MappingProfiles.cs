using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreatePostDto, Post>();
            CreateMap<UpdatePostDto, Post>();

        }
    }
}
