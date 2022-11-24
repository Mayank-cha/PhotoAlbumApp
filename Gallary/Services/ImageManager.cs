using Gallary.Data;
using Gallary.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
namespace Gallary.Services
{
    public class ImageManager : IImageManager   
    {
        private readonly ApplicationDbContext _context;
        private readonly Microsoft.AspNetCore.Hosting.IHostingEnvironment _environment;
        public ImageManager(ApplicationDbContext context, Microsoft.AspNetCore.Hosting.IHostingEnvironment environment) { 
            this._context = context;
            this._environment = environment;
        }

        public async Task<bool> addImage(Images image, IFormFile file)
        {
            int id = (int)this._context.Images.Count();
            string Path = this._environment.ContentRootPath + "/Images/" + image.UserId + "_";
            string fileName = (id) + "_" + DateTime.Now.ToString().Replace(" ", "_").Replace(":","_") + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            Directory.CreateDirectory(Path);
            var buffer = 1024 * 1024;
            using var stream = new FileStream(Path+fileName, FileMode.Create, FileAccess.Write, FileShare.None, buffer, useAsync: false);
            await file.CopyToAsync(stream);
            await stream.FlushAsync();
            image.Path = "/Images/" + image.UserId + "_" + fileName;
            await this._context.Images.AddAsync(image);
            return await this._context.SaveChangesAsync() > 0;
        }

        public async Task<List<Images>> getImages(string UserId)
        {
            var result = from task in _context.Images where task.UserId == UserId select task;
            return await result.ToListAsync<Images>();
        }
        public async Task<bool> updateImageDetails(Images image) {
            var image_new = from im in _context.Images where im.ID == image.ID && im.UserId == image.UserId select im;
            var img=image_new.First<Images>();
            img.Tag = image.Tag;
            img.Title = image.Title;
            this._context.Images.Update(img);
            return await this._context.SaveChangesAsync() > 0;
        }
        public async Task<bool> updateImage(Images image,IFormFile file)
        {
            var image_new = from im in _context.Images where im.ID == image.ID && im.UserId==image.UserId select im;
            var img = image_new.First<Images>();
            img.Tag = image.Tag;
            img.Title = image.Title;
            string Path = this._environment.ContentRootPath+"/Images/" + img.UserId + "_";
            string fileName = (img.ID) + "_"+DateTime.Now.ToString().Replace(" ", "_").Replace(":", "_") + "_"+ ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            Directory.CreateDirectory(Path);
            var buffer = 1024 * 1024;
            using var stream = new FileStream(Path + fileName, FileMode.Create, FileAccess.Write, FileShare.None, buffer, useAsync: false);
            await file.CopyToAsync(stream);
            await stream.FlushAsync();
            img.Path = "/Images/" + image.UserId + "_" + fileName;
            this._context.Images.Update(img);
            return await this._context.SaveChangesAsync() > 0;
        }

        public async Task<bool> deleteImage(int id)
        {
            var image = from im in _context.Images where im.ID == id select im;
            this._context.Images.Remove(image.First());
            return await this._context.SaveChangesAsync() > 0;
        }
    }
}
