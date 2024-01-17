using Microsoft.AspNetCore.Identity;

namespace Todos.API.Models.Domain;
public class Todo
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime Due { get; set; }
    public string IdentityUserId { get; set; }
    public Guid PriorityId { get; set; }
    public Guid StatusId { get; set; }
    public IdentityUser IdentityUser { get; set; }
    public Priority Priority { get; set; }
    public Status Status { get; set; }

}

