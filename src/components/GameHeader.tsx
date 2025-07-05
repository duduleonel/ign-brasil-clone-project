
import React from 'react';
import { Play, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Game } from '@/types/database';

interface GameHeaderProps {
  game: Game;
}

const GameHeader: React.FC<GameHeaderProps> = ({ game }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mb-8">
      {/* Featured Image */}
      <div className="relative">
        <img 
          src={game.featured_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e'}
          alt={game.title}
          className="w-full h-96 object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {game.title}
          </h1>
          
          {/* Quick Info */}
          <div className="flex flex-wrap gap-4 text-white/90">
            {game.release_date && (
              <span className="flex items-center">
                <Calendar size={16} className="mr-1" />
                {new Date(game.release_date).getFullYear()}
              </span>
            )}
            
            {game.genre && (
              <span>{game.genre}</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Platforms */}
        {game.platforms && game.platforms.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {game.platforms.map((platform, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                <span>{platform}</span>
              </Badge>
            ))}
          </div>
        )}

        {/* Genre */}
        {game.genre && (
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              {game.genre}
            </Badge>
          </div>
        )}

        {/* Summary */}
        {game.summary && (
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {game.summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameHeader;
