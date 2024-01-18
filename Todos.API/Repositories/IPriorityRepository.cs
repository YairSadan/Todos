namespace Todos.API;

public interface IPriorityRepository
{
    Task<List<Priority>> GetAllAsync();
}
