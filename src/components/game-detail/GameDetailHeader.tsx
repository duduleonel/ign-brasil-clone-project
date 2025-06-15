
import React from 'react';
import { Star, Calendar, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import FavoriteButton from '@/components/FavoriteButton';
import type { Game } from '@/types/database';

interface GameDetailHeaderProps {
  game: Game;
}

const GameDetailHeader: React.FC<GameDetailHeaderProps> = ({ game }) => {
  return (
    <Card className="mb-8 overflow-hidden">
      <div className="relative">
        <img 
          src={game.featured_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e'}
          alt={game.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Title and Meta Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-4">
                {game.title}
              </h1>
              
              {/* Quick Meta Info */}
              <div className="flex flex-wrap gap-4 text-white/90">
                {game.release_date && (
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(game.release_date).getFullYear()}
                  </span>
                )}
                
                {game.genres && game.genres.length > 0 && (
                  <span>{game.genres[0].name}</span>
                )}

                {game.developers && game.developers.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Users size={16} />
                    {game.developers[0].name}
                  </span>
                )}
              </div>
            </div>
            
            {/* Rating and Favorite */}
            <div className="flex items-center gap-3">
              {game.rating && (
                <div className="bg-green-600 text-white px-3 py-2 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star size={16} className="text-yellow-400 fill-current mr-1" />
                    <span className="font-bold">{game.rating}</span>
                  </div>
                </div>
              )}
              <FavoriteButton itemId={game.id} itemType="game" />
            </div>
          </div>
        </div>
      </div>

      {/* Game Info Section */}
      <CardContent className="p-6">
        {/* Platforms and Genres */}
        <div className="flex flex-wrap gap-4 mb-6">
          {game.platforms && game.platforms.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Plataformas:</span>
              {game.platforms.map((platform) => (
                <Badge key={platform.slug} variant="outline">
                  {platform.name}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {game.genres && game.genres.map((genre) => (
            <Badge key={genre.slug} className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              {genre.name}
            </Badge>
          ))}
        </div>

        {/* Game Summary */}
        {game.summary && (
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Sobre o Jogo</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {game.summary}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameDetailHeader;
