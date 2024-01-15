using Microsoft.AspNetCore.Mvc;

namespace Todos.API.Controllers
{
    // https://localhost:portnumber/api/todos
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        //https://localhost:portnumber/api/todos
        [HttpGet]
        public IActionResult GetAllTodos()
        {
            string[] todos = new string[] {
                "Todo 1",
                "Todo 2",
                "Todo 3"
            };
            return Ok(todos);
        }
    }
}