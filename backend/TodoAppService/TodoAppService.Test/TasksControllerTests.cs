using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Controllers;
using TodoApp.Api.Data;
using TodoApp.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace TodoApp.Tests
{
    public class TasksControllerTests
    {
        private AppDbContext GetInMemoryContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            var context = new AppDbContext(options);
            context.Tasks.Add(new TaskItem { Title = "Sample task" });
            context.SaveChanges();
            return context;
        }

        [Fact]
        public async Task GetAll_ReturnsOk()
        {
            var ctx = GetInMemoryContext();
            var controller = new TasksController(ctx);
            var result = await controller.GetAll();
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task Create_AddsTask()
        {
            var ctx = GetInMemoryContext();
            var controller = new TasksController(ctx);
            var newTask = new TaskItem { Title = "New Task" };
            var result = await controller.Create(newTask);
            Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(2, ctx.Tasks.Count());
        }
    }
}
