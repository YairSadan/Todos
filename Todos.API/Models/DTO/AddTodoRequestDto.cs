using Todos.API.Models.Domain;

namespace Todos.API;

public class AddTodoRequestDto
{
    public string Title { get; set; }
    public string? Description { get; set; }

    public PriorityLevel Priority { get; set; }
    public StatusLevel Status { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime Due { get; set; }
    public Guid UserId { get; set; }
}
