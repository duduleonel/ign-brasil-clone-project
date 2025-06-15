
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FavoriteButtonProps {
  itemId: string;
  itemType: 'post' | 'game';
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  itemId, 
  itemType, 
  className = '' 
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = async () => {
    setIsLoading(true);
    
    // Simular delay da API - depois conectar com Supabase
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    const key = `${itemType}_${itemId}`;
    
    if (favorites[key]) {
      delete favorites[key];
      setIsFavorited(false);
    } else {
      favorites[key] = { itemId, itemType, addedAt: new Date().toISOString() };
      setIsFavorited(true);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsLoading(false);
  };

  React.useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '{}');
    const key = `${itemType}_${itemId}`;
    setIsFavorited(!!favorites[key]);
  }, [itemId, itemType]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`hover:bg-red-50 dark:hover:bg-red-900/20 ${className}`}
    >
      <Heart 
        size={16} 
        className={`transition-colors ${
          isFavorited 
            ? 'text-red-500 fill-red-500' 
            : 'text-gray-500 hover:text-red-500'
        } ${isLoading ? 'animate-pulse' : ''}`}
      />
    </Button>
  );
};

export default FavoriteButton;
