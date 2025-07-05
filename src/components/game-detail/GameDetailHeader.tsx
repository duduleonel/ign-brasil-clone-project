
import React from 'react';
import { Calendar, User, Tag, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Game } from '@/types/database';

interface GameDetailHeaderProps {
  game: Game;
}

const GameDetailHeader: React.FC<GameDetailHeaderProps> = ({ game }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mb-8">
      <div className="relative">
        {game.featured_image && (
          <div className="aspect-video relative">
            <img 
              src={game.featured_image}
              alt={`Banner de ${game.title}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {game.release_date && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(game.release_date).toLocaleDateString('pt-BR')}</span>
              </div>
            )}
            
            {game.developer && (
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{game.developer}</span>
              </div>
            )}
            
            {game.genre && (
              <div className="flex items-center gap-2">
                <Tag size={16} />
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {game.genre}
                </Badge>
              </div>
            )}
            
            {game.rating && (
              <div className="flex items-center gap-2">
                <Star size={16} className="text-yellow-400 fill-current" />
                <span>{game.rating}/5</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Game Info Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {game.developer && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Desenvolvedor</h3>
              <p className="text-gray-600 dark:text-gray-400">{game.developer}</p>
            </div>
          )}
          
          {game.publisher && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Produtora</h3>
              <p className="text-gray-600 dark:text-gray-400">{game.publisher}</p>
            </div>
          )}
          
          {game.platforms && game.platforms.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Plataformas</h3>
              <div className="flex flex-wrap gap-2">
                {game.platforms.map((platform, index) => (
                  <Badge key={index} variant="outline">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {game.genre && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Gênero</h3>
              <Badge variant="outline">{game.genre}</Badge>
            </div>
          )}
        </div>
        
        {game.summary && (
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Resumo</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{game.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetailHeader;
