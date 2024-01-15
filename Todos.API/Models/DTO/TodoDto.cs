using Todos.API.Models.Domain;

namespace Todos.API;

public class TodoDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }

    public PriorityLevel Priority { get; set; }
    public StatusLevel Status { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime Due { get; set; }
    public UserDto User { get; set; }
}
