namespace API.Entities
{
    public class Reply
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public string Text { get; set; }
        public DateTime Timestamp { get; set; }
        public int Upvotes { get; set; }
        public int Reports { get; set; }

        public int CommentId { get; set; }
        public Comment Comment { get; set; }
    }
}
