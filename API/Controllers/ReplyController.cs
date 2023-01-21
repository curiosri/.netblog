using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReplyController : BaseApiController
    {
        private readonly BlogContext _context;

        public ReplyController(BlogContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Reply>>> GetReplies()
        {
            return await _context.Replies.ToListAsync();

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Reply>> GetComment(int id)
        {
            return await _context.Replies.FindAsync(id);
        }

    }
}
