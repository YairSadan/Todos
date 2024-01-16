﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Todos.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> userManager;
    private readonly ITokenRepository tokenRepository;

    public AuthController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository)
    {
        this.userManager = userManager;
        this.tokenRepository = tokenRepository;
    }
    // Post: /api/auth/register
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequestDto)
    {
        var identityUser = new IdentityUser
        {
            UserName = registerRequestDto.Username,
            Email = registerRequestDto.Username
        };
        var identityResult = await userManager.CreateAsync(identityUser, registerRequestDto.Password);

        if (identityResult.Succeeded)
        {
            if (registerRequestDto.Roles != null && registerRequestDto.Roles.Any())
            {
                identityResult = await userManager.AddToRolesAsync(identityUser, registerRequestDto.Roles);
                if (identityResult.Succeeded)
                {
                    return Ok("User was registered! Please login.");
                }
            }
        }
        return BadRequest("Something went wrong");
    }


    // Post: /api/auth/login
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto loginRequestDto)
    {
        var user = await userManager.FindByEmailAsync(loginRequestDto.Username);
        if (user != null)
        {
            var checkPasswordResult = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);
            if (checkPasswordResult)
            {
                var roles = await userManager.GetRolesAsync(user);
                if (roles != null)
                {
                    var jwtToken = tokenRepository.CreateJWTToken(user, roles.ToList());
                    var response = new LoginResponseDto
                    {
                        JwtToken = jwtToken
                    };
                    return Ok(response);
                }
            }
        }
        return BadRequest("Username or password is incorrect");
    }
}
