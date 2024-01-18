using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Todos.API;
[Route("api/[controller]")]
[ApiController]
public class MyUsersController(IMapper mapper, IMyUserRepository myUserRepository) : ControllerBase
{
    private readonly IMapper mapper = mapper;
    private readonly IMyUserRepository myUserRepository = myUserRepository;

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll([FromQuery] string? filterOn, [FromQuery] string? filterQuery, [FromQuery] string? sortBy, [FromQuery] bool? isAscending, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 1000)
    {
        var myUsersModel = await myUserRepository.GetAllAsync(filterOn, filterQuery, sortBy, isAscending ?? true, pageNumber, pageSize);
        return Ok(mapper.Map<List<MyUserDto>>(myUsersModel));
    }

    [HttpGet]
    [Route("{id}")]
    [Authorize]
    public async Task<IActionResult> GetById([FromRoute] string id)
    {
        var myUserModel = await myUserRepository.GetByIdAsync(id);
        if (myUserModel == null)
            return NotFound();
        return Ok(mapper.Map<MyUserDto>(myUserModel));
    }
}
