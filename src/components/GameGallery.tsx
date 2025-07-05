
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Game } from '@/types/database';

interface GameGalleryProps {
  game: Game;
}

const GameGallery: React.FC<GameGalleryProps> = ({ game }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use featured_image as fallback for screenshots
  const allImages = game.featured_image ? [game.featured_image] : [];

  if (allImages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ZoomIn size={20} />
            Galeria de Imagens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>Nenhuma imagem disponível para este jogo.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const openLightbox = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(allImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(allImages[prevIndex]);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ZoomIn size={20} />
            Galeria de Imagens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allImages.map((image, index) => (
              <div
                key={index}
                className="aspect-video relative group cursor-pointer overflow-hidden rounded-lg border"
                onClick={() => openLightbox(image, index)}
              >
                <img 
                  src={image}
                  alt={`${game.title} - Imagem ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage}
              alt={`${game.title} - Imagem ampliada`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X size={20} />
            </Button>

            {/* Navigation */}
            {allImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={prevImage}
                >
                  <ChevronLeft size={24} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={nextImage}
                >
                  <ChevronRight size={24} />
                </Button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded">
              {currentIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameGallery;
