using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.Dtos.Tasks;

namespace TaskManager.Api.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private readonly TaskManagerDbContext _context;

        public TaskController(TaskManagerDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _context.Tasks.ToListAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();

            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskRequest request)
        {
            var taskItem = new Entities.Task()
            {
                Title = request.Title,
                Description = request.Description,
                UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            };

            _context.Tasks.Add(taskItem);
            await _context.SaveChangesAsync();

            var response = new TaskResponse
            {
                Id = taskItem.Id,
                Title = taskItem.Title,
                Description = taskItem.Description
            };

            return Ok(response);
        }
    }
}