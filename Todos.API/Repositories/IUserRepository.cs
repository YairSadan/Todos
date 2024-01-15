﻿using Todos.API.Models.Domain;

namespace Todos.API;

public interface IUserRepository
{
    Task<List<User>> GetAllAsync(string? filterOn = null, string? filterQuery = null);
    Task<User?> GetByIdAsync(Guid id);
    Task<User> CreateAsync(User user);
    Task<User?> UpdateAsync(Guid id, User user);
    Task<User?> DeleteAsync(Guid id);
}