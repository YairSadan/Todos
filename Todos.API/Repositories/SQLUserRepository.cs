using Microsoft.EntityFrameworkCore;
using Todos.API.Data;
using Todos.API.Models.Domain;

namespace Todos.API;

public class SQLUserRepository(TodosDbContext dbContext) : IUserRepository
{
    private readonly TodosDbContext dbContext = dbContext;

    public async Task<User> CreateAsync(User user)
    {
        await dbContext.Users.AddAsync(user);
        await dbContext.SaveChangesAsync();
        return user;
    }

    public async Task<User?> DeleteAsync(Guid id)
    {
        var existingUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        if (existingUser == null)
            return null;
        dbContext.Users.Remove(existingUser);
        await dbContext.SaveChangesAsync();
        return existingUser;
    }

    public async Task<List<User>> GetAllAsync(string? filterOn = null, string? filterQuery = null)
    {
        var users = dbContext.Users.AsQueryable();
        if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
        {
            if (filterOn.Equals("Name", StringComparison.OrdinalIgnoreCase))
                users = users.Where(user => EF.Functions.ILike(user.Name, $"%{filterQuery}%"));
        }
        return await users.ToListAsync();
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<User?> UpdateAsync(Guid id, User user)
    {
        var existingUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        if (existingUser == null)
            return null;
        existingUser.Name = user.Name;
        existingUser.ImageUrl = user.ImageUrl;

        await dbContext.SaveChangesAsync();
        return existingUser;
    }
}