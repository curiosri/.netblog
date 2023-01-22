using API.Entities;
using System.Collections.Generic;

namespace API.DTOs
{
    public class BookmarkDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public List<SavedItemDto> Items { get; set; }
    }
}