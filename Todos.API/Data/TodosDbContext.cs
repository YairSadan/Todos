using Microsoft.EntityFrameworkCore;
using Todos.API.Models.Domain;

namespace Todos.API.Data;
public class TodosDbContext : DbContext
{
    public TodosDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {

    }

    public DbSet<Todo> Todos { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var users = new List<User>() {
            new User() { Id = Guid.Parse("00000000-0000-0000-0000-000000000001"), Name="example user name" }
        };
        modelBuilder.Entity<User>().HasData(users);
    }
}
