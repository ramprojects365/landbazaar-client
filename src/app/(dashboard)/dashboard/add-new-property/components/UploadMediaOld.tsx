import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import apiClient from "@/config/axios";

export default function UploadMedia() {
  const { formState: { errors }, setError, setValue, watch } = useFormContext();
  const watchedImages = watch('images') || [];
  const [isUploading, setIsUploading] = useState(false);
  
  const removeImage = (indexToRemove: number) => {
    const currentImages = watchedImages || [];
    const newImages = currentImages.filter((_: string, index: number) => index !== indexToRemove);
    setValue('images', newImages);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    console.log('Files selected:', files);
    
    if (!files.length) return;

    setIsUploading(true);
    
    try {
      // Upload images to backend
      const formData = new FormData();
      files.forEach((file, index) => {
        console.log(`Appending file ${index}:`, file.name, file.type, file.size);
        formData.append('files', file);
      });

      console.log('FormData entries before sending:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await apiClient.post('/uploads', formData);
      
      console.log('Upload response:', response.data);
      
      // Get uploaded URLs from response
      const uploadedUrls = response.data?.data?.imageUrls || 
                        response.data?.imageUrls || 
                        response.data?.urls || 
                        [];
      
      if (uploadedUrls.length === 0) {
        throw new Error('No image URLs returned from server');
      }
      
      // Add new URLs to existing images
      const currentImages = watchedImages || [];
      const allImages = [...currentImages, ...uploadedUrls];
      setValue('images', allImages);
      
      console.log('All images now:', allImages);
      
    } catch (error: unknown) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload images';
      setError('images', { type: 'manual', message: errorMessage });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="tp-dashboard-new-property mb-15">
      <h5 className="tp-dashboard-new-title">Upload Media</h5>

      <div className="tp-dashboard-new-um">
        {/* Upload Area */}
        <div className="tp-dashboard-new-um-content">
          <span className="upload-btn">
            <input
              id="tp-dashboard-new-um-file-input"
              type="file"
              accept="image/png, image/jpeg"
              multiple
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <label htmlFor="tp-dashboard-new-um-file-input">
              {isUploading ? 'Uploading...' : 'Add Photos'}
            </label>
          </span>
          {errors.images && (
            <div className="text-danger" style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>
              {typeof errors.images.message === 'string' ? errors.images.message : 'Image validation error'}
            </div>
          )}
          <p>
            Add photos to get 5X more responses.
            <br /> 90% tenants contact on properties with photos.
          </p>
        </div>

        {/* Image Preview Area */}
        <div className="tp-dashboard-new-um-img-box d-flex">
          {watchedImages && watchedImages.length > 0 ? (
            watchedImages.map((img: string, index: number) => (
              <div key={index} className="tp-dashboard-new-um-img">
                <Image
                  src={img}
                  alt={`uploaded-image-${index + 1}`}
                  unoptimized
                  width={800}
                  height={600}
                />
                <button 
                  type="button"
                  onClick={() => removeImage(index)}
                  style={{ 
                    position: 'absolute', 
                    top: '5px', 
                    right: '5px', 
                    background: 'red', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '50%', 
                    width: '25px', 
                    height: '25px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: '#666', fontSize: '14px' }}>No images uploaded yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
