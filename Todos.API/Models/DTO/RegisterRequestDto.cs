using System.ComponentModel.DataAnnotations;

namespace Todos.API;

public class RegisterRequestDto
{
    [Required]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
    [Required]
    public string[] Roles { get; set; }
}
