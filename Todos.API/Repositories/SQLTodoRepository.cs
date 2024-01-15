using Microsoft.EntityFrameworkCore;
using Todos.API.Data;
using Todos.API.Models.Domain;

namespace Todos.API;

public class SQLTodoRepository : ITodoRepository
{
    private readonly TodosDbContext dbContext;

    public SQLTodoRepository(TodosDbContext dbContext)
    {
        this.dbContext = dbContext;
    }
    public async Task<Todo> CreateAsync(Todo todo)
    {
        await dbContext.Todos.AddAsync(todo);
        await dbContext.SaveChangesAsync();
        return todo;
    }

    public async Task<Todo?> DeleteAsync(Guid id)
    {
        var existingTodo = await dbContext.Todos.FirstOrDefaultAsync(todo => todo.Id == id);
        if (existingTodo == null)
            return null;
        dbContext.Todos.Remove(existingTodo);
        await dbContext.SaveChangesAsync();
        return existingTodo;
    }

    public async Task<List<Todo>> GetAllAsync(string? filterOn = null, string? filterQuery = null)
    {
        var todos = dbContext.Todos.Include("User").Include("Priority").Include("Status").AsQueryable();
        // Filtering 
        if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
        {
            if (filterOn.Equals("Status", StringComparison.OrdinalIgnoreCase))
                todos = todos.Where(todo => EF.Functions.ILike(todo.Status.Name, filterQuery));
            else if (filterOn.Equals("Priority", StringComparison.OrdinalIgnoreCase))
                todos = todos.Where(todo => EF.Functions.ILike(todo.Priority.Name, filterQuery));
            else if (filterOn.Equals("User", StringComparison.OrdinalIgnoreCase))
                todos = todos.Where(todo => EF.Functions.ILike(todo.User.Name, filterQuery));
        }
        return await todos.ToListAsync();
    }

    public async Task<Todo?> GetByIdAsync(Guid id)
    {
        return await dbContext.Todos.Include("User").Include("Priority").Include("Status").FirstOrDefaultAsync(todo => todo.Id == id);
    }

    public async Task<Todo?> UpdateAsync(Guid id, Todo todo)
    {
        var existingTodo = await dbContext.Todos.FirstOrDefaultAsync(todo => todo.Id == id);
        if (existingTodo == null)
            return null;
        existingTodo.Title = todo.Title;
        existingTodo.Description = todo.Description;
        existingTodo.Priority = todo.Priority;
        existingTodo.Status = todo.Status;
        existingTodo.Due = todo.Due;
        existingTodo.User = todo.User;
        await dbContext.SaveChangesAsync();
        return existingTodo;
    }
}
