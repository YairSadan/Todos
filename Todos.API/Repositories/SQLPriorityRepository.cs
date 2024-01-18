
using Microsoft.EntityFrameworkCore;
using Todos.API.Data;

namespace Todos.API;

public class SQLPriorityRepository(TodosDbContext dbContext) : IPriorityRepository
{
    private readonly TodosDbContext dbContext = dbContext;
    public Task<List<Priority>> GetAllAsync()
    {
        return dbContext.Priorities.ToListAsync();
    }
}
