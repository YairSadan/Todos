using AutoMapper;
using Todos.API.Models.Domain;

namespace Todos.API;

public class AutoMapperProfiles: Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<AddUserRequestDto, User>().ReverseMap();
        CreateMap<UpdateUserRequestDto, User>().ReverseMap();
    }

}
