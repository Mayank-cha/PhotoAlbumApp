using Gallary.Models;
using Gallary.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.Json;

namespace Gallary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ImageController : ControllerBase
    {
        private IImageManager _imageManager;
        public ImageController(IImageManager imagemanager)
        {
            _imageManager = imagemanager;
        }
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> getImageList(){
            var list=await this._imageManager.getImages(this.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            return Ok(list.OrderByDescending(image=>image.ID));
        }
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> addImage(IFormCollection data) {
            IFormFile file = Request.Form.Files[0];
            var useId = this.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var image= JsonSerializer.Deserialize<tempModel>(data["data"][0]);
            await this._imageManager.addImage(new Images() { Tag=image.tag,Title=image.title,UserId=useId}, file);
            return Ok(true);
        }
        [HttpPost]
        [Route("delete")]
        public async Task<IActionResult> deleteImage([FromBody] Images image)
        {

            await this._imageManager.deleteImage(image.ID);
            return Ok(true);
        }
        
        [HttpPost]
        [Route("details")]
        public async Task<IActionResult> updateImageDetails([FromBody] Images image)
        {
            var useId = this.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            image.UserId = useId;
            var output= await this._imageManager.updateImageDetails(image);
            return Ok(output);
        }

        [HttpPost]
        [Route("update")]
        public async Task<IActionResult> updateImage(IFormCollection data) {
            IFormFile file = Request.Form.Files[0];
            var useId = this.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var image = JsonSerializer.Deserialize<tempModel>(data["data"][0]);
            await this._imageManager.updateImage(new Images() { ID=image.id,Tag = image.tag, Title = image.title, UserId = useId }, file);
            return Ok(true);
        }
    }
}
