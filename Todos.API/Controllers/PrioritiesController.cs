using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Todos.API;

[Route("api/[controller]")]
[ApiController]
public class PrioritiesController(IMapper mapper, IPriorityRepository priorityRepository) : ControllerBase
{
    private readonly IMapper mapper = mapper;
    private readonly IPriorityRepository priorityRepository = priorityRepository;

    // GET: api/priorities
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var prioritiesModel = await priorityRepository.GetAllAsync();
        return Ok(mapper.Map<List<PriorityDto>>(prioritiesModel));
    }

}
