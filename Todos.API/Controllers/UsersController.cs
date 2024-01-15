using AutoMapper;
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
    private readonly IUserRepository userRepository;
    private readonly IMapper mapper;

    public UsersController(TodosDbContext dbContext, IUserRepository userRepository, IMapper mapper)
    {
        this.dbContext = dbContext;
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    // GET: https://localhost:portnumber/api/users
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? filterOn, [FromQuery] string? filterQuery)
    {
        var users = await userRepository.GetAllAsync(filterOn, filterQuery);
        return Ok(mapper.Map<List<UserDto>>(users));
    }

    // GET: https://localhost:portnumber/api/users/{id}
    [HttpGet]
    [Route("{id:Guid}")]
    public async Task<IActionResult> GetById([FromRoute] Guid id)
    {
        var user = await userRepository.GetByIdAsync(id);
        if (user == null)
            return NotFound();
        return Ok(mapper.Map<UserDto>(user));
    }

    // POST: https://localhost:portnumber/api/users
    [HttpPost]
    [ValidateModel]
    public async Task<IActionResult> Create([FromBody] AddUserRequestDto addUserRequestDto)
    {
        var userModel = mapper.Map<User>(addUserRequestDto);
        userModel = await userRepository.CreateAsync(userModel);
        var userDto = mapper.Map<UserDto>(userModel);
        return CreatedAtAction(nameof(GetById), new { id = userModel.Id }, userDto);
    }
    // PUT: https://localhost:portnumber/api/users/{id}
    [HttpPut]
    [Route("{id:Guid}")]
    [ValidateModel]
    public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateUserRequestDto updateUserRequestDto)
    {
        var userModel = mapper.Map<User>(updateUserRequestDto);
        userModel = await userRepository.UpdateAsync(id, userModel);
        if (userModel == null)
            return NotFound();
        return Ok(mapper.Map<UserDto>(userModel));
    }

    // DELETE: https://localhost:portnumber/api/users/{id}
    [HttpDelete]
    [Route("{id:Guid}")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var userModel = await userRepository.DeleteAsync(id);
        if (userModel == null)
            return NotFound();
        return Ok(mapper.Map<UserDto>(userModel));
    }
}
