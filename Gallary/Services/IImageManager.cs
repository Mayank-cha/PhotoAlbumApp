using Gallary.Models;

namespace Gallary.Services
{
    public interface IImageManager
    {
        public Task<bool> addImage(Images image,IFormFile file);
        public Task<List<Images>> getImages(string UserId);
        public Task<bool> updateImage(Images image,IFormFile file);
        public Task<bool> updateImageDetails(Images image);
        public Task<bool> deleteImage(int id);

    }
}
