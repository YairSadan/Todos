using Microsoft.EntityFrameworkCore;
using Todos.API.Models.Domain;

namespace Todos.API.Data; 
public class TodosDbContext: DbContext {
    public TodosDbContext(DbContextOptions dbContextOptions): base(dbContextOptions) {
    
    }

    public DbSet<Todo> Todos { get; set; }
    public DbSet<User> Users { get; set; }
}
