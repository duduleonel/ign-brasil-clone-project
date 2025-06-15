import React from 'react';
import { Calendar, Monitor, Star } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import type { Game } from '@/types/database';

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={game.featured_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e'}
          alt={game.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        {game.rating && (
          <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-lg flex items-center gap-1">
            <Star size={12} className="text-yellow-400 fill-current" />
            <span className="text-sm font-bold">{game.rating}</span>
          </div>
        )}

        {/* Featured Badge */}
        {game.is_featured && (
          <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
            DESTAQUE
          </div>
        )}

        {/* Favorite Button */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <FavoriteButton 
            itemId={game.id} 
            itemType="game"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>

        {/* Metacritic Score */}
        {game.metacritic_score && (
          <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className={`px-2 py-1 rounded text-white text-xs font-bold ${
              game.metacritic_score >= 75 ? 'bg-green-600' :
              game.metacritic_score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              {game.metacritic_score}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {game.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {game.summary || 'Clique para ver mais detalhes...'}
        </p>

        {/* Price */}
        {game.price && (
          <div className="mb-3">
            <span className="text-green-600 dark:text-green-400 font-bold text-lg">
              R$ {game.price.toFixed(2)}
            </span>
          </div>
        )}

        {/* Plataformas */}
        {game.platforms && game.platforms.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {game.platforms.slice(0, 3).map((platform) => (
              <span 
                key={platform.slug}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md flex items-center gap-1"
              >
                <Monitor size={10} />
                {platform.name}
              </span>
            ))}
            {game.platforms.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md">
                +{game.platforms.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Gêneros */}
        {game.genres && game.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {game.genres.slice(0, 2).map((genre) => (
              <span 
                key={genre.slug}
                className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full"
              >
                {genre.name}
              </span>
            ))}
            {game.genres.length > 2 && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                +{game.genres.length - 2}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
          {game.release_date && (
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(game.release_date).getFullYear()}
            </span>
          )}
          
          {/* ESRB Rating */}
          {game.esrb_rating && (
            <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              {game.esrb_rating}
            </span>
          )}
          
          <span className="text-green-600 dark:text-green-400">Ver detalhes →</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
