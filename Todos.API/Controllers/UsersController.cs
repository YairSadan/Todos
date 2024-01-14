using Microsoft.AspNetCore.Mvc;
using Todos.API.Data;

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
        var users = dbContext.Users.ToList();
        return Ok(users);
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
        return Ok(user);
    }
}
