
import React from 'react';
import { Star, Calendar, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import FavoriteButton from './FavoriteButton';
import type { Game } from '@/types/database';

interface GameCardProps {
  game: Game;
  isLarge?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, isLarge = false }) => {
  return (
    <Link to={`/jogo/${game.slug}`}>
      <div className={`bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700 cursor-pointer ${isLarge ? 'md:col-span-2' : ''}`}>
        <div className="relative">
          <img 
            src={game.featured_image || game.cover_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e'}
            alt={game.title}
            className={`w-full object-cover ${isLarge ? 'h-64' : 'h-48'}`}
          />
          
          {/* Rating Badge */}
          {game.rating && (
            <div className="absolute top-3 left-3">
              <div className="bg-green-600 text-white px-2 py-1 rounded-lg text-sm font-bold flex items-center">
                <Star size={14} className="mr-1 fill-current" />
                {game.rating}
              </div>
            </div>
          )}

          {/* Favorite Button */}
          <div className="absolute top-3 right-3">
            <FavoriteButton itemId={game.id} itemType="game" />
          </div>

          {/* Price Badge */}
          {game.price && (
            <div className="absolute bottom-3 right-3">
              <div className="bg-black/80 text-white px-2 py-1 rounded text-sm font-bold">
                R$ {game.price.toFixed(2)}
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4">
          <h3 className={`text-gray-900 dark:text-white font-bold mb-2 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors ${isLarge ? 'text-xl' : 'text-lg'}`}>
            {game.title}
          </h3>
          
          {/* Genres */}
          {game.genres && game.genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {game.genres.slice(0, 2).map((genre) => (
                <Badge key={genre.slug} variant="outline" className="text-xs">
                  {genre.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Summary */}
          {game.summary && (
            <p className={`text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 ${isLarge ? 'text-base' : 'text-sm'}`}>
              {game.summary}
            </p>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
            <div className="flex items-center space-x-3">
              {game.release_date && (
                <span className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  {new Date(game.release_date).getFullYear()}
                </span>
              )}
              
              {game.platforms && game.platforms.length > 0 && (
                <span className="text-xs">
                  {game.platforms[0].name}
                </span>
              )}
            </div>
            
            <div className="flex items-center">
              <Download size={14} className="mr-1" />
              <span className="text-xs">Download</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
