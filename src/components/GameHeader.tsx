
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
        
        {/* Trailer Button */}
        {game.trailer_url && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button 
              size="lg"
              className="bg-black/50 hover:bg-black/70 text-white border border-white/30"
              onClick={() => window.open(game.trailer_url, '_blank')}
            >
              <Play size={20} className="mr-2" />
              Assistir Trailer
            </Button>
          </div>
        )}
        
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
            
            {game.genres && game.genres.length > 0 && (
              <span>{game.genres[0].name}</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Platforms */}
        {game.platforms && game.platforms.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {game.platforms.map((platform) => (
              <Badge key={platform.slug} variant="outline" className="flex items-center gap-1">
                <span>{platform.name}</span>
              </Badge>
            ))}
          </div>
        )}

        {/* Genres */}
        {game.genres && game.genres.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {game.genres.map((genre) => (
              <Badge key={genre.slug} className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                {genre.name}
              </Badge>
            ))}
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
