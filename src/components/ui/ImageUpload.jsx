"use client";
import React, { useState, useRef } from 'react';
import { BiUpload, BiX, BiLoader } from 'react-icons/bi';

const ImageUpload = ({ 
  onImageUpload, 
  currentImage = null, 
  folder = '/portfolio',
  className = '',
  placeholder = 'Click to upload image'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(currentImage);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    setUploadError('');
    setIsUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);

      // Upload to ImageKit
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('folder', folder);

      const response = await fetch('/api/imagekit/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setPreviewImage(data.url);
        onImageUpload(data.url, data);
      } else {
        if (data.error?.includes('ImageKit not configured')) {
          setUploadError('ImageKit not configured. Please enter image URL manually below.');
        } else {
          setUploadError(data.error || 'Upload failed');
        }
        setPreviewImage(currentImage);
      }
    } catch (error) {
      setUploadError('Upload failed: ' + error.message);
      setPreviewImage(currentImage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    onImageUpload('', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative">
        {previewImage ? (
          <div className="relative group">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border border-white/10"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleClick}
                  disabled={isUploading}
                  className="px-3 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors flex items-center gap-2"
                >
                  <BiUpload />
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isUploading}
                  className="px-3 py-2 bg-red-500/80 rounded-lg text-white hover:bg-red-500 transition-colors flex items-center gap-2"
                >
                  <BiX />
                  Remove
                </button>
              </div>
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center">
                <div className="flex items-center gap-2 text-white">
                  <BiLoader className="animate-spin" />
                  Uploading...
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            disabled={isUploading}
            className="w-full h-48 border-2 border-dashed border-white/20 rounded-lg hover:border-white/40 transition-colors flex flex-col items-center justify-center text-gray-400 hover:text-gray-300"
          >
            {isUploading ? (
              <div className="flex items-center gap-2">
                <BiLoader className="animate-spin text-xl" />
                <span>Uploading...</span>
              </div>
            ) : (
              <>
                <BiUpload className="text-3xl mb-2" />
                <span>{placeholder}</span>
                <span className="text-sm text-gray-500 mt-1">
                  PNG, JPG, WEBP up to 5MB
                </span>
              </>
            )}
          </button>
        )}
      </div>

      {uploadError && (
        <div className="text-red-400 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
          {uploadError}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
