using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Todos.API.Models.Domain;
public class Todo
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime Due { get; set; }
    [ForeignKey(nameof(MyUser))]
    public string MyUserId { get; set; }
    public Guid PriorityId { get; set; }
    public Guid StatusId { get; set; }
    public MyUser MyUser { get; set; }
    public Priority Priority { get; set; }
    public Status Status { get; set; }
}

