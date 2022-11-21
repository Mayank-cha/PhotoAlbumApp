using Gallary.Data;
using Gallary.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
namespace Gallary.Services
{
    public class ImageManager : IImageManager   
    {
        private readonly ApplicationDbContext _context;
        public ImageManager(ApplicationDbContext context) { 
            this._context = context;
        }

        public async Task<bool> addImage(Images image, IFormFile file)
        {
            int id = (int)this._context.Images.Count();
            string Path = "/Images/" + image.UserId + "/";
            string fileName = (id+1)+"_"+ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var buffer = 1024 * 1024;
            using var stream = new FileStream(Path+fileName, FileMode.Create, FileAccess.Write, FileShare.None, buffer, useAsync: false);
            await file.CopyToAsync(stream);
            await stream.FlushAsync();
            image.Path = Path+fileName;
            await this._context.Images.AddAsync(image);
            return await this._context.SaveChangesAsync() > 0;
        }

        public async Task<List<Images>> getImages(string UserId)
        {
            var result = from task in _context.Images where task.UserId == UserId select task;
            return await result.ToListAsync<Images>();
        }

        public bool updateImage(string image)
        {
            throw new NotImplementedException();
        }

        public bool deleteImage(int id)
        {
            throw new NotImplementedException();
        }
    }
}
