namespace Todos.API;

public class MyUserDto
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public ICollection<TodoDto> Todos { get; set; }
}
