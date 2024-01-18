using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Todos.API.Models.Domain;

namespace Todos.API.Data;
public class TodosDbContext(DbContextOptions<TodosDbContext> dbContextOptions) : IdentityDbContext<MyUser>(dbContextOptions)
{
    public DbSet<Todo> Todos { get; set; }
    public DbSet<Priority> Priorities { get; set; }
    public DbSet<Status> Statuses { get; set; }
    public DbSet<MyUser> MyUsers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        var priorities = new List<Priority>() {
            new() { Id = Guid.Parse("24a11bab-3f79-46d6-b523-105775634dc7"), Name="Low" },
            new() { Id = Guid.Parse("8e5ab86b-0ff0-45bb-9478-c9f154fec4c1"), Name="Medium" },
            new() { Id = Guid.Parse("71fcc481-e946-4c76-acca-06a02b540453"), Name="High" },
            new() { Id = Guid.Parse("7308fad5-ccf2-49ed-bcd5-cf35ac147abf"), Name="Critical" }
        };
        modelBuilder.Entity<Priority>().HasData(priorities);

        var statuses = new List<Status>() {
            new() { Id = Guid.Parse("e1527379-a581-4768-8705-ae332d045cb4"), Name="Pending" },
            new() { Id = Guid.Parse("4bdcc014-791f-481a-91b5-892bec8d36b3"), Name="In Progress" },
            new() { Id = Guid.Parse("c4a55655-87b6-4579-9eec-4dc4d011f6b1"), Name="Done" },
            new() { Id = Guid.Parse("ef97ff6b-2330-4492-b349-1c74e2ef3d12"), Name="Canceled" }
        };
        modelBuilder.Entity<Status>().HasData(statuses);
    }
}
