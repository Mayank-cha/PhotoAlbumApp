using System.ComponentModel.DataAnnotations;

namespace Gallary.Models
{
    public class Images
    {
        [Key]
        public int ID { get; set; }
        public string Tag { get; set; }
        public string Title { get; set; }
        public string Path { get; set; }
        public string UserId { get; set; }
    }
}
