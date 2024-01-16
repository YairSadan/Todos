using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Todos.API;

public class TodosAuthDbContext(DbContextOptions<TodosAuthDbContext> options) : IdentityDbContext(options)
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        var readerRoleId = "481f50da-b7a6-4bd2-8d2d-5c0caff3a591";
        var writerRoleId = "1d27ea1d-2d8b-49c2-ab35-f8837ae19289";
        var roles = new List<IdentityRole>{
            new() { Id = readerRoleId,
            ConcurrencyStamp = readerRoleId,
            Name = "Reader",
            NormalizedName = "Reader".ToUpper() },
            new() { Id = writerRoleId,
            ConcurrencyStamp = writerRoleId,
            Name = "Writer",
            NormalizedName = "Writer".ToUpper() }
        };
        builder.Entity<IdentityRole>().HasData(roles);
    }
}
