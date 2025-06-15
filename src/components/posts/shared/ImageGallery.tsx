
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  layout?: 'grid' | 'masonry' | 'carousel';
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, layout = 'grid' }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  if (layout === 'carousel') {
    return (
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 pb-4">
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 relative group">
              <img
                src={image.src}
                alt={image.alt}
                className="w-64 h-48 object-cover rounded-lg cursor-pointer"
                onClick={() => openLightbox(index)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`${
        layout === 'masonry' 
          ? 'columns-1 md:columns-2 lg:columns-3 gap-4' 
          : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
      }`}>
        {images.map((image, index) => (
          <div key={index} className="relative group cursor-pointer break-inside-avoid mb-4">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto rounded-lg object-cover"
              onClick={() => openLightbox(index)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
              <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
            </div>
            {image.caption && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{image.caption}</p>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={() => closeLightbox()}>
        <DialogContent className="max-w-4xl p-0">
          {selectedImage !== null && (
            <div className="relative">
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <ChevronRight size={24} />
              </button>
              
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full"
              >
                <X size={24} />
              </button>
              
              {images[selectedImage].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-white p-4">
                  <p className="text-center">{images[selectedImage].caption}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
