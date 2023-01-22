namespace API.Entities
{
    public class Bookmark
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public List<SavedItem> Items { get; set; } = new();
        public void AddItem(Post post)
        {
            if (Items.All(item => item.PostId != post.Id))
            // The item is not  in the bookmark.
            {
                Items.Add(new SavedItem { Post = post });
            }


        }
        public void RemoveItem(int postId)
        {
            var item = Items.FirstOrDefault(item => item.PostId == postId);
            if (item == null) return;
            if (item.PostId == postId) Items.Remove(item);

        }

    }
}