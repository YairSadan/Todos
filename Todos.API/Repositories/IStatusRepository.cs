namespace Todos.API;

public interface IStatusRepository
{
    Task<List<Status>> GetAllAsync();
}
