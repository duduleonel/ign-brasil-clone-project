
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
      {game.featured_image && (
        <div className="aspect-[3/4] relative">
          <img 
            src={game.featured_image}
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

        {/* Developer and Publisher info */}
        <div className="space-y-2">
          {game.developer && (
            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Desenvolvedor
              </div>
              <div className="font-medium">
                {game.developer}
              </div>
            </div>
          )}
          
          {game.publisher && (
            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Produtora
              </div>
              <div className="font-medium">
                {game.publisher}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
