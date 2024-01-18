using Microsoft.EntityFrameworkCore;
using Todos.API.Data;

namespace Todos.API;

public class SQLMyUserRepository(TodosDbContext dbContext) : IMyUserRepository
{
    private readonly TodosDbContext dbContext = dbContext;

    public async Task<MyUser> CreateAsync(MyUser myUser)
    {
        await dbContext.MyUsers.AddAsync(myUser);
        await dbContext.SaveChangesAsync();
        return myUser;
    }

    public async Task<MyUser?> DeleteAsync(string id)
    {
        var existingMyUser = await dbContext.MyUsers.FirstOrDefaultAsync(myUser => myUser.Id == id);
        if (existingMyUser == null)
            return null;
        dbContext.MyUsers.Remove(existingMyUser);
        await dbContext.SaveChangesAsync();
        return existingMyUser;
    }

    public async Task<List<MyUser>> GetAllAsync(string? filterOn = null, string? filterQuery = null, string? sortBy = null, bool isAscending = true, int pageNumber = 1, int pageSize = 1000)
    {
        var myUsers = dbContext.MyUsers.AsQueryable();
        // Filtering 
        if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
        {
            if (filterOn.Equals("Name", StringComparison.OrdinalIgnoreCase))
                myUsers = myUsers.Where(myUser => EF.Functions.ILike(myUser.UserName, filterQuery));
            else if (filterOn.Equals("Email", StringComparison.OrdinalIgnoreCase))
                myUsers = myUsers.Where(myUser => EF.Functions.ILike(myUser.Email, filterQuery));
        }

        // Sorting
        if (string.IsNullOrWhiteSpace(sortBy) == false)
        {
            if (sortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                myUsers = isAscending ? myUsers.OrderBy(myUser => myUser.UserName) : myUsers.OrderByDescending(myUser => myUser.UserName);
            else if (sortBy.Equals("Email", StringComparison.OrdinalIgnoreCase))
                myUsers = isAscending ? myUsers.OrderBy(myUser => myUser.Email) : myUsers.OrderByDescending(myUser => myUser.Email);
        }
        else
            myUsers = myUsers.OrderByDescending(myUser => myUser.UserName);

        // Pagination
        var skipResults = (pageNumber - 1) * pageSize;
        return await myUsers.Skip(skipResults).Take(pageSize).ToListAsync();
    }

    public async Task<MyUser?> GetByIdAsync(string id)
    {
        return await dbContext.MyUsers.FirstOrDefaultAsync(myUser => myUser.Id == id);
    }

    public async Task<MyUser?> UpdateAsync(string id, MyUser myUser)
    {
        var existingMyUser = await dbContext.MyUsers.FirstOrDefaultAsync(myUser => myUser.Id == id);
        if (existingMyUser == null)
            return null;
        existingMyUser.UserName = myUser.UserName;
        existingMyUser.Email = myUser.Email;
        await dbContext.SaveChangesAsync();
        return existingMyUser;
    }

}
