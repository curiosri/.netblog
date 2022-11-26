namespace API.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public int PostId { get; set; } 
        public int AuthorId { get; set; }
        public string Text { get; set; }
        public DateTime Timestamp { get; set; }

    }
}
