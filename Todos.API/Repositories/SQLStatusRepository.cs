
using Microsoft.EntityFrameworkCore;
using Todos.API.Data;

namespace Todos.API;

public class SQLStatusRepository(TodosDbContext dbContext) : IStatusRepository
{
    private readonly TodosDbContext dbContext = dbContext;
    public Task<List<Status>> GetAllAsync()
    {
        return dbContext.Statuses.ToListAsync();
    }
}
