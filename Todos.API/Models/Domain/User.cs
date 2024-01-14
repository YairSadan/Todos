namespace Todos.API.Models.Domain {
    public class User {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? ImageUrl { get; set; }
    }
}
