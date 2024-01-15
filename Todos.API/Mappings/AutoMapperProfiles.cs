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
        CreateMap<AddTodoRequestDto, Todo>().ReverseMap();
        CreateMap<Todo, TodoDto>().ReverseMap();
        CreateMap<UpdateTodoRequestDto, Todo>().ReverseMap();
        CreateMap<Priority, PriorityDto>().ReverseMap();
        CreateMap<Status, StatusDto>().ReverseMap();
    }

}
