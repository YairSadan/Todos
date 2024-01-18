using Microsoft.AspNetCore.Identity;
using Todos.API.Models.Domain;

namespace Todos.API;

public class MyUser : IdentityUser
{
    public ICollection<Todo> Todos { get; set; } = [];
}
