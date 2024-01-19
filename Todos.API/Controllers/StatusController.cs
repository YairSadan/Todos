using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Todos.API;

[Route("api/[controller]")]
[ApiController]
public class StatusController(IMapper mapper, IStatusRepository statusRepository) : ControllerBase
{
    private readonly IMapper mapper = mapper;
    private readonly IStatusRepository statusRepository = statusRepository;

    // GET: api/status
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var statusesModel = await statusRepository.GetAllAsync();
        return Ok(mapper.Map<List<StatusDto>>(statusesModel));
    }

}
