using Microsoft.AspNetCore.Mvc;
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
    public IActionResult GetAll()
    {
        // Get Data From Database - Domain models
        var users = dbContext.Users.ToList();

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
    public IActionResult GetById([FromRoute] Guid id)
    {
        var user = dbContext.Users.FirstOrDefault(x => x.Id == id);
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
    public IActionResult Create([FromBody] AddUserRequestDto addUserRequestDto)
    {
        var userModel = new User
        {
            Name = addUserRequestDto.Name,
            ImageUrl = addUserRequestDto.ImageUrl
        };
        dbContext.Users.Add(userModel);
        dbContext.SaveChanges();
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
    public IActionResult Update([FromRoute] Guid id, [FromBody] UpdateUserRequestDto updateUserRequestDto)
    {
        var userModel = dbContext.Users.FirstOrDefault(x => x.Id == id);
        if (userModel == null)
            return NotFound();
        userModel.Name = updateUserRequestDto.Name;
        userModel.ImageUrl = updateUserRequestDto.ImageUrl;
        dbContext.SaveChanges();
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
    public IActionResult Delete([FromRoute] Guid id)
    {
        var userModel = dbContext.Users.FirstOrDefault(x => x.Id == id);
        if (userModel == null)
            return NotFound();
        dbContext.Users.Remove(userModel);
        dbContext.SaveChanges();
        var userDto = new UserDto
        {
            Id = userModel.Id,
            Name = userModel.Name,
            ImageUrl = userModel.ImageUrl
        };
        return Ok(userDto);
    }
}
