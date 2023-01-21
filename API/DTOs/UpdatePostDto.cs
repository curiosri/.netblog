using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class UpdatePostDto
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        [Required]
        public DateTime Timestamp { get; set; }
        [Required]
        public int AuthorId { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public string Category { get; set; }
    }
}