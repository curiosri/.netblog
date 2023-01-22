using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("SavedItems")]
    public class SavedItem
    {
        public int Id { get; set; }
        public string Name { get; set; }


        //navigation properties
        public int PostId { get; set; }
        public Post Post { get; set; }

        public int BookmarkId { get; set; }
        public Bookmark Bookmark { get; set; }
    }
}