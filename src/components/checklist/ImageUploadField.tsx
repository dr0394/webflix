import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  description?: string;
  sectionId: string;
  images: string[];
  onChange: (sectionId: string, images: string[]) => void;
  maxImages?: number;
  totalImagesUploaded: number;
  maxTotalImages: number;
}

export default function ImageUploadField({
  label,
  description,
  sectionId,
  images,
  onChange,
  maxImages = 5,
  totalImagesUploaded,
  maxTotalImages
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (totalImagesUploaded >= maxTotalImages) {
      alert(`Sie haben bereits ${maxTotalImages} Bilder hochgeladen. Das ist das Maximum.`);
      return;
    }

    if (images.length >= maxImages) {
      alert(`Maximal ${maxImages} Bilder pro Section erlaubt.`);
      return;
    }

    const remainingSlots = Math.min(
      maxImages - images.length,
      maxTotalImages - totalImagesUploaded
    );

    if (files.length > remainingSlots) {
      alert(`Sie können nur noch ${remainingSlots} Bild(er) hochladen.`);
      return;
    }

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} ist zu groß. Maximal 10MB pro Bild.`);
        continue;
      }

      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            'Authorization': 'Client-ID 546c25a59c58ad7'
          },
          body: formData
        });

        const result = await response.json();

        if (result.success && result.data?.link) {
          uploadedUrls.push(result.data.link);
        } else {
          throw new Error(result.data?.error || 'Upload fehlgeschlagen');
        }
      } catch (error: any) {
        console.error('Error uploading:', error);
        alert(`Fehler beim Hochladen von ${file.name}: ${error.message}`);
      }
    }

    if (uploadedUrls.length > 0) {
      onChange(sectionId, [...images, ...uploadedUrls]);
    }

    setIsUploading(false);
    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(sectionId, newImages);
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 mb-3">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((url, index) => (
          <div key={index} className="relative group">
            <img
              src={url}
              alt={`Referenz ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border border-white/10"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
              {index + 1}
            </div>
          </div>
        ))}

        {images.length < maxImages && totalImagesUploaded < maxTotalImages && (
          <label className="h-32 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-500/50 hover:bg-white/5 transition-all">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              disabled={isUploading}
              className="hidden"
            />
            {isUploading ? (
              <>
                <Loader className="w-8 h-8 text-orange-500 animate-spin mb-2" />
                <span className="text-xs text-gray-400">Hochladen...</span>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-xs text-gray-400">Bild hinzufügen</span>
                <span className="text-xs text-gray-500 mt-1">
                  {images.length}/{maxImages}
                </span>
              </>
            )}
          </label>
        )}
      </div>

      {images.length === 0 && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 flex items-start gap-3">
          <ImageIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-blue-400 font-medium mb-1">Optional: Referenzbilder hochladen</p>
            <p className="text-gray-400">
              Laden Sie Beispielbilder hoch, um zu zeigen, wie diese Section aussehen soll.
              Dies hilft uns, Ihre Website genau nach Ihren Vorstellungen zu gestalten.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Gesamt: {totalImagesUploaded}/{maxTotalImages} Bilder verwendet</span>
        <span>Max 10MB pro Bild</span>
      </div>
    </div>
  );
}
