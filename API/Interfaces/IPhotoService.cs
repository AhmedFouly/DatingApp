using CloudinaryDotNet.Actions;

namespace API.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile File);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}
