using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BookmarkController : BaseApiController
    {
        private readonly BlogContext _context;

        public BookmarkController(BlogContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BookmarkDto>> GetBookmark()
        {
            var bookmark = await RetrieveBookmark();

            if (bookmark == null) return NotFound();

            return new BookmarkDto
            {
                Id = bookmark.Id,
                UserId = bookmark.UserId,
                Items = bookmark.Items.Select(item => new SavedItemDto
                {
                    PostId = item.PostId,
                    Title = item.Post.Title,
                    Category = item.Post.Category,
                    Timestamp = item.Post.Timestamp,
                    Hits = item.Post.Hits,
                    Upvotes = item.Post.Upvotes
                }).ToList()
            };
        }



        [HttpPost]
        public async Task<ActionResult> AddItemToBookmark(int postId)
        {
            // get the basket 
            var bookmark = await RetrieveBookmark();

            // check if the bookmark is null, and create one when it is null
            if (bookmark == null) bookmark = CreateBookmark();

            // get the post
            var post = await _context.Posts.FindAsync(postId);
            if (post == null) return NotFound();

            // add item
            bookmark.AddItem(post);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return StatusCode(201);
            return BadRequest(new ProblemDetails { Title = "Problem saving item to bookmark" });

            // save changes
            return StatusCode(201);
        }



        [HttpDelete]
        public async Task<ActionResult> RemoveItem(int postId)
        {
            // get basket
            // remove item
            // save changes
            return Ok();
        }


        // extract the method for reuse
        private async Task<Bookmark> RetrieveBookmark()
        {
            return await _context.Bookmarks
                      .Include(i => i.Items)
                      .ThenInclude(p => p.Post)
                      .FirstOrDefaultAsync(x => x.UserId == Request.Cookies["userId"]);
        }

        // return a new bookmark
        private Bookmark CreateBookmark()
        {
            var userId = Guid.NewGuid().ToString(); // globally unique identifier
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("userId", userId, cookieOptions);
            var bookmark = new Bookmark { UserId = userId };
            _context.Bookmarks.Add(bookmark);
            return bookmark;

        }
    }


}
