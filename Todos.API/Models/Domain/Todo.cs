namespace Todos.API.Models.Domain;
public class Todo {
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string? Description { get; set; }

    public PriorityLevel Priority { get; set; }
    public StatusLevel Status { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime Due { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }

}
public enum PriorityLevel {
    Low,
    Medium,
    High
}
public enum StatusLevel {
    NotStarted,
    InProgress,
    Completed
}

