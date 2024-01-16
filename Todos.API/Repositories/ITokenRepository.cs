using Microsoft.AspNetCore.Identity;

namespace Todos.API;

public interface ITokenRepository
{
    string CreateJWTToken(IdentityUser user, List<string> roles);
}
