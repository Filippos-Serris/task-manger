using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.Entities
{
    public class Task
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Title { get; set; }

        [Required]
        [MaxLength(100)]
        public string Description { get; set; }

        public string UserId { get; set; }
        public User User { get; set; }
    }
}