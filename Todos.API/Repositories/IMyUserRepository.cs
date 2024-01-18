namespace Todos.API;

public interface IMyUserRepository
{
    Task<MyUser> CreateAsync(MyUser myUser);
    Task<List<MyUser>> GetAllAsync(string? filterOn = null, string? filterQuery = null, string? sortBy = null, bool isAscending = true, int pageNumber = 1, int pageSize = 1000);
    Task<MyUser?> GetByIdAsync(string id);
    Task<MyUser?> UpdateAsync(string id, MyUser myUser);
    Task<MyUser?> DeleteAsync(string id);
}
