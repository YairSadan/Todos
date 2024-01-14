using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todos.API.Data;
using Todos.API.Models.Domain;

namespace Todos.API.Controllers;
// https://localhost:portnumber/api/users
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly TodosDbContext dbContext;
    public UsersController(TodosDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    // GET ALL USERS
    // GET: https://localhost:portnumber/api/users
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        // Get Data From Database - Domain models
        var users = await dbContext.Users.ToListAsync();

        // Map Domain Models to DTOs
        var usersDto = new List<UserDto>();
        foreach (var user in users)
        {
            usersDto.Add(new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                ImageUrl = user.ImageUrl
            });
        }

        // Return DTOs
        return Ok(usersDto);
    }

    // GET USER BY ID
    // GET: https://localhost:portnumber/api/users/{id}
    [HttpGet]
    [Route("{id:Guid}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        if (user == null)
            return NotFound();
        var userDto = new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            ImageUrl = user.ImageUrl
        };
        return Ok(userDto);
    }

    // Post To Create New User 
    // POST: https://localhost:portnumber/api/users
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AddUserRequestDto addUserRequestDto)
    {
        var userModel = new User
        {
            Name = addUserRequestDto.Name,
            ImageUrl = addUserRequestDto.ImageUrl
        };
        await dbContext.Users.AddAsync(userModel);
        await dbContext.SaveChangesAsync();
        var userDto = new UserDto
        {
            Id = userModel.Id,
            Name = userModel.Name,
            ImageUrl = userModel.ImageUrl
        };
        return CreatedAtAction(nameof(GetById), new { id = userModel.Id }, userDto);
    }
    // Update user
    // PUT: https://localhost:portnumber/api/users/{id}
    [HttpPut]
    [Route("{id:Guid}")]
    public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateUserRequestDto updateUserRequestDto)
    {
        var userModel = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        if (userModel == null)
            return NotFound();
        userModel.Name = updateUserRequestDto.Name;
        userModel.ImageUrl = updateUserRequestDto.ImageUrl;
        await dbContext.SaveChangesAsync();
        var userDto = new UserDto
        {
            Id = userModel.Id,
            Name = userModel.Name,
            ImageUrl = userModel.ImageUrl
        };
        return Ok(userDto);
    }

    // Delete user
    // DELETE: https://localhost:portnumber/api/users/{id}
    [HttpDelete]
    [Route("{id:Guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var userModel = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        if (userModel == null)
            return NotFound();
        dbContext.Users.Remove(userModel);
        await dbContext.SaveChangesAsync();
        var userDto = new UserDto
        {
            Id = userModel.Id,
            Name = userModel.Name,
            ImageUrl = userModel.ImageUrl
        };
        return Ok(userDto);
    }
}
