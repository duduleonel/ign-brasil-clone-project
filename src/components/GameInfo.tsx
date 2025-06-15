
import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Game } from '@/types/database';

interface GameInfoProps {
  game: Game;
}

const GameInfo: React.FC<GameInfoProps> = ({ game }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden sticky top-8">
      {game.cover_image && (
        <div className="aspect-[3/4] relative">
          <img 
            src={game.cover_image}
            alt={`Capa de ${game.title}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      
      <div className="p-4">
        {/* Rating */}
        {game.rating && (
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-600 text-white px-4 py-2 rounded-lg text-center">
              <div className="flex items-center justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16}
                    className={`${i < Math.round(game.rating!) ? 'text-yellow-400 fill-current' : 'text-white/50'}`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold">{game.rating}</span>
              <div className="text-xs opacity-75">Nota</div>
            </div>
          </div>
        )}

        {/* Metacritic Score */}
        {game.metacritic_score && (
          <div className="text-center mb-4">
            <div className={`inline-block px-3 py-1 rounded text-white font-bold ${
              game.metacritic_score >= 75 ? 'bg-green-600' :
              game.metacritic_score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
            }`}>
              {game.metacritic_score}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Metacritic
            </div>
          </div>
        )}

        {/* Price */}
        {game.price && (
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              R$ {game.price.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Preço
            </div>
          </div>
        )}

        {/* ESRB Rating */}
        {game.esrb_rating && (
          <div className="text-center">
            <Badge variant="outline" className="text-xs">
              {game.esrb_rating}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameInfo;
