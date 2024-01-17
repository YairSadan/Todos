namespace Todos.API;

public class LoginResponseDto
{
    public string JwtToken { get; set; }
    public string UserId { get; set; }
    public string Email { get; set; }
}
