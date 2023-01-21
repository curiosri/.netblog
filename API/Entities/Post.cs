using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public DateTime Timestamp { get; set; }
        public int AuthorId { get; set; }
        public string Text { get; set; }
        public string Tags { get; set; }
        public int Hits { get; set; }
        public int Upvotes { get; set; }
        public int Reports { get; set; }
        public List<Comment>? Comments { get; set; } = new();


    }
}
