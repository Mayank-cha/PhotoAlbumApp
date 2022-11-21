using Gallary.Models;

namespace Gallary.Services
{
    public interface IImageManager
    {
        public Task<bool> addImage(Images image,IFormFile file);
        public Task<List<Images>> getImages(string UserId);
        public bool updateImage(string image);
        public bool deleteImage(int id);

    }
}
