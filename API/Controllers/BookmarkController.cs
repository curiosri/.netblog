using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace API.Controllers
{
    public class BookmarkController : BaseApiController
    {
        private readonly BlogContext _context;

        public BookmarkController(BlogContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBookmark")] // route name required
        public async Task<ActionResult<BookmarkDto>> GetBookmark()
        {
            var bookmark = await RetrieveBookmark();

            if (bookmark == null) return NotFound();
            return MapBookmarkToDto(bookmark);
        }

        
        [HttpPost]
        public async Task<ActionResult<BookmarkDto>> AddItemToBookmark(int postId)
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
            if (result) return CreatedAtRoute("GetBookmark", MapBookmarkToDto(bookmark) );
            return BadRequest(new ProblemDetails { Title = "Problem saving item to bookmark" });

            // save changes
            return StatusCode(201);
        }



        [HttpDelete]
        public async Task<ActionResult> RemoveItem(int postId)
        {
            // get basket
            var bookmark = await RetrieveBookmark();
            if (bookmark == null) return NotFound();
            // remove item
            bookmark.RemoveItem(postId);
            // save changes
            var result = await _context.SaveChangesAsync() > 0;
            
            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Could not remove the bookmark"});
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


        private BookmarkDto MapBookmarkToDto(Bookmark bookmark)
        {
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
                    AuthorId = item.Post.AuthorId,
                    Text = item.Post.Text,
                    Tags = item.Post.Tags,
                    Hits = item.Post.Hits,
                    Upvotes = item.Post.Upvotes,
                    Reports = item.Post.Reports,
                }).ToList()
            };
        }

    }


}
