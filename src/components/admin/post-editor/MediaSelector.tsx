
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Video, Image } from 'lucide-react';

interface MediaSelectorProps {
  mediaType: 'image' | 'video';
  setMediaType: (type: 'image' | 'video') => void;
  featuredImage: string;
  onInputChange: (field: string, value: string) => void;
}

const MediaSelector: React.FC<MediaSelectorProps> = ({ 
  mediaType, 
  setMediaType, 
  featuredImage, 
  onInputChange 
}) => {
  const getMediaPlaceholder = () => {
    if (mediaType === 'video') {
      return 'URL do vídeo (YouTube, Vimeo, etc.)';
    }
    return 'URL da imagem';
  };

  return (
    <>
      <div className="space-y-2">
        <Label>Tipo de Mídia Destacada</Label>
        <div className="flex gap-4">
          <Button
            type="button"
            variant={mediaType === 'image' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMediaType('image')}
          >
            <Image size={16} className="mr-2" />
            Imagem
          </Button>
          <Button
            type="button"
            variant={mediaType === 'video' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMediaType('video')}
          >
            <Video size={16} className="mr-2" />
            Vídeo
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="featured_image">
          {mediaType === 'video' ? 'Vídeo Destacado' : 'Imagem Destacada'}
        </Label>
        <Input
          id="featured_image"
          value={featuredImage}
          onChange={(e) => onInputChange('featured_image', e.target.value)}
          placeholder={getMediaPlaceholder()}
        />
      </div>
    </>
  );
};

export default MediaSelector;
