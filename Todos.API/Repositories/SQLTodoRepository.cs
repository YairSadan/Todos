﻿using Microsoft.EntityFrameworkCore;
using Todos.API.Data;
using Todos.API.Models.Domain;

namespace Todos.API;

public class SQLTodoRepository(TodosDbContext dbContext) : ITodoRepository
{
    private readonly TodosDbContext dbContext = dbContext;

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

    public async Task<List<Todo>> GetAllAsync(string? filterOn = null, string? filterQuery = null, string? sortBy = null, bool isAscending = true, int pageNumber = 1, int pageSize = 1000)
    {
        var todos = dbContext.Todos.Include("Priority").Include("Status").Include("MyUser").AsQueryable();
        if (string.IsNullOrWhiteSpace(filterOn) == false)
        {
            // Filtering 
            if (filterOn.Equals("ThisWeek", StringComparison.OrdinalIgnoreCase))
            {
                var today = DateTime.UtcNow;
                var startOfWeek = today.AddDays(-1 * (int)today.DayOfWeek);
                var endOfWeek = startOfWeek.AddDays(7);
                todos = todos.Where(todo => todo.Due >= startOfWeek && todo.Due <= endOfWeek);
            }
            if (string.IsNullOrWhiteSpace(filterQuery) == false)
            {
                if (filterOn.Equals("Status", StringComparison.OrdinalIgnoreCase))
                    todos = todos.Where(todo => EF.Functions.ILike(todo.Status.Name, filterQuery));
                else if (filterOn.Equals("Priority", StringComparison.OrdinalIgnoreCase))
                    todos = todos.Where(todo => EF.Functions.ILike(todo.Priority.Name, filterQuery));
                else if (filterOn.Equals("User", StringComparison.OrdinalIgnoreCase))
                    todos = todos.Where(todo => EF.Functions.ILike(todo.MyUser.UserName, filterQuery));

            }
        }

        // Sorting
        if (string.IsNullOrWhiteSpace(sortBy) == false)
        {
            if (sortBy.Equals("Status", StringComparison.OrdinalIgnoreCase))
                todos = isAscending ? todos.OrderBy(todo => todo.Status.Name) : todos.OrderByDescending(todo => todo.Status.Name);
            else if (sortBy.Equals("Priority", StringComparison.OrdinalIgnoreCase))
                todos = isAscending ? todos.OrderBy(todo => todo.Priority.Name) : todos.OrderByDescending(todo => todo.Priority.Name);
            else if (sortBy.Equals("Due", StringComparison.OrdinalIgnoreCase))
                todos = isAscending ? todos.OrderBy(todo => todo.Due) : todos.OrderByDescending(todo => todo.Due);
        }
        else
            todos = todos.OrderByDescending(todo => todo.CreatedOn);

        // Pagination
        var skipResults = (pageNumber - 1) * pageSize;
        return await todos.Skip(skipResults).Take(pageSize).ToListAsync();
    }

    public async Task<Todo?> GetByIdAsync(Guid id)
    {
        return await dbContext.Todos.Include("Priority").Include("Status").Include("MyUser").FirstOrDefaultAsync(todo => todo.Id == id);
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
        await dbContext.SaveChangesAsync();
        return existingTodo;
    }
}
