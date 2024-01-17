using Microsoft.AspNetCore.Identity;
using Todos.API.Models.Domain;

namespace Todos.API;

public class TodoDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime Due { get; set; }
    public PriorityDto Priority { get; set; }
    public StatusDto Status { get; set; }
}
