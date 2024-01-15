using System.ComponentModel.DataAnnotations;

namespace Todos.API;

public class UpdateUserRequestDto
{
    [Required]
    [MinLength(2, ErrorMessage = "Name must be at least 2 characters long")]
    [MaxLength(50, ErrorMessage = "Name cannot be more than 50 characters long")]
    public string Name { get; set; }
    public string? ImageUrl { get; set; }
}
