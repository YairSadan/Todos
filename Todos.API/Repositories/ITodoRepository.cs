using Todos.API.Models.Domain;

namespace Todos.API;

public interface ITodoRepository
{
    Task<Todo> CreateAsync(Todo todo);
    Task<List<Todo>> GetAllAsync(string? filterOn = null,string? filterQuery = null, string? sortBy = null, bool isAscending = true);
    Task<Todo?> GetByIdAsync(Guid id);
    Task<Todo?> UpdateAsync(Guid id, Todo todo);
    Task<Todo?> DeleteAsync(Guid id);
}
