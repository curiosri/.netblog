namespace API.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public string Text { get; set; }
        public DateTime Timestamp { get; set; }
        public int Upvotes { get; set; }
        public int Reports { get; set; }

        public int PostId { get; set; }
        public Post Post { get; set; }
        public List<Reply>? ReplyComments { get; set; } = new();

    }
}
