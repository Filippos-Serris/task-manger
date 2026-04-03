using Microsoft.AspNetCore.Identity;

namespace TaskManager.Api.Entities
{
    public class User : IdentityUser
    {
        public string FullName { get; set; }
        public ICollection<Task> Tasks { get; set; }
    }
}