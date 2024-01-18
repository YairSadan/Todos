using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Todos.API;
using Todos.API.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Todos.API", Version = "v1" });
});

builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);
builder.Services.AddAuthorizationBuilder();

builder.Services.AddDbContext<TodosDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("TodosConnectionString")));

builder.Services.AddIdentityCore<MyUser>().AddEntityFrameworkStores<TodosDbContext>().AddApiEndpoints();

builder.Services.AddScoped<ITodoRepository, SQLTodoRepository>();
builder.Services.AddScoped<IMyUserRepository, SQLMyUserRepository>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));

var app = builder.Build();

app.MapIdentityApi<MyUser>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(options => options.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials());

app.MapControllers();

app.Run();
