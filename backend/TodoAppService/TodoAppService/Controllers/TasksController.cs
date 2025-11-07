using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Data;
using TodoApp.Api.Models;

namespace TodoApp.Api.Controllers
{
    [ApiController]
    [Route("api / [controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TasksController(AppDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _context.Tasks.ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create(TaskItem task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TaskItem updated)
    {
        var existing = await _context.Tasks.FindAsync(id);
        if (existing == null) return NotFound();
        existing.Title = updated.Title;
        existing.IsCompleted = updated.IsCompleted;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
{
    var task = await _context.Tasks.FindAsync(id);
    if (task == null) return NotFound();
    _context.Tasks.Remove(task);
    await _context.SaveChangesAsync();
    return NoContent();
}
    }
}
