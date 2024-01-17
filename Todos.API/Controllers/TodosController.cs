using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Todos.API.Models.Domain;

namespace Todos.API.Controllers
{
    // https://localhost:portnumber/api/todos
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController(IMapper mapper, ITodoRepository todoRepository) : ControllerBase
    {
        private readonly IMapper mapper = mapper;
        private readonly ITodoRepository todoRepository = todoRepository;

        // POST: api/todos
        [HttpPost]
        [ValidateModel]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Create([FromBody] AddTodoRequestDto addTodoRequestDto)
        {
            var todoModel = mapper.Map<Todo>(addTodoRequestDto);
            await todoRepository.CreateAsync(todoModel);
            return Ok(mapper.Map<TodoDto>(todoModel));
        }

        // GET: api/todos
        // GET: api/todos?filterOn=Status/Priority/User&filterQuery=filterQuery&sortBy=Status/Priority/User/Due&isAscending=true/false&pageNumber=1&pageSize=10
        [HttpGet]
        // [Authorize(Roles = "Writer, Reader")]
        public async Task<IActionResult> GetAll([FromQuery] string? filterOn, [FromQuery] string? filterQuery, [FromQuery] string? sortBy, [FromQuery] bool? isAscending, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 1000)
        {
            var todosModel = await todoRepository.GetAllAsync(filterOn, filterQuery, sortBy, isAscending ?? true, pageNumber, pageSize);
            return Ok(mapper.Map<List<TodoDto>>(todosModel));
        }

        // GET: api/todos/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Reader")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var todoModel = await todoRepository.GetByIdAsync(id);
            if (todoModel == null)
                return NotFound();
            return Ok(mapper.Map<TodoDto>(todoModel));
        }

        // PUT: api/todos/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        [ValidateModel]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateTodoRequestDto updateTodoRequestDto)
        {
            var todoModel = mapper.Map<Todo>(updateTodoRequestDto);
            todoModel = await todoRepository.UpdateAsync(id, todoModel);
            if (todoModel == null)
                return NotFound();
            return Ok(mapper.Map<TodoDto>(todoModel));
        }

        // DELETE: api/todos/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deletedTodoModel = await todoRepository.DeleteAsync(id);
            if (deletedTodoModel == null)
                return NotFound();
            return Ok(mapper.Map<TodoDto>(deletedTodoModel));
        }

    }
}