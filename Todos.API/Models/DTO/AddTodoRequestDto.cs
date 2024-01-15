using System.ComponentModel.DataAnnotations;
using Todos.API.Models.Domain;

namespace Todos.API;

public class AddTodoRequestDto
{
    [Required]
    [MinLength(2, ErrorMessage = "Title must be at least 2 characters long")]
    [MaxLength(50, ErrorMessage = "Title cannot be more than 50 characters long")]
    public string Title { get; set; }
    [MaxLength(1000, ErrorMessage = "Description cannot be more than 1000 characters long")]
    public string? Description { get; set; }
    [Required]
    public PriorityLevel Priority { get; set; }
    [Required]
    public StatusLevel Status { get; set; }
    public DateTime CreatedOn { get; set; }
    [Required]
    public DateTime Due { get; set; }
    [Required]
    public Guid UserId { get; set; }
}
