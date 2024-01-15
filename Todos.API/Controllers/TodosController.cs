using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Todos.API.Models.Domain;

namespace Todos.API.Controllers
{
    // https://localhost:portnumber/api/todos
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ITodoRepository todoRepository;

        public TodosController(IMapper mapper, ITodoRepository todoRepository)
        {
            this.mapper = mapper;
            this.todoRepository = todoRepository;
        }
        // POST: api/todos
        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] AddTodoRequestDto addTodoRequestDto)
        {
            var todoModel = mapper.Map<Todo>(addTodoRequestDto);
            await todoRepository.CreateAsync(todoModel);
            return Ok(mapper.Map<TodoDto>(todoModel));
        }

        // GET: api/todos
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var todosModel = await todoRepository.GetAllAsync();
            return Ok(mapper.Map<List<TodoDto>>(todosModel));
        }

        // GET: api/todos/{id}
        [HttpGet]
        [Route("{id:Guid}")]
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
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var deletedTodoModel = await todoRepository.DeleteAsync(id);
            if (deletedTodoModel == null)
                return NotFound();
            return Ok(mapper.Map<TodoDto>(deletedTodoModel));
        }

    }
}