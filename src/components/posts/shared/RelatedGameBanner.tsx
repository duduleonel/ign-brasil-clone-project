
import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ExternalLink } from 'lucide-react';
import type { Game } from '@/types/database';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RelatedGameBannerProps {
  game: Game;
}

const RelatedGameBanner: React.FC<RelatedGameBannerProps> = ({ game }) => {
  return (
    <Card className="mb-6 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Gamepad2 size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700 dark:text-green-300 font-medium mb-1">
                Jogo Relacionado
              </p>
              <h3 className="font-bold text-gray-900 dark:text-white">
                {game.title}
              </h3>
              {game.genres && game.genres.length > 0 && (
                <div className="flex gap-2 mt-1">
                  {game.genres.slice(0, 2).map((genre) => (
                    <Badge key={genre.slug} variant="outline" className="text-xs">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {game.featured_image && (
              <img 
                src={game.featured_image}
                alt={game.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <Link 
              to={`/jogos/${game.slug}`}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              Ver Jogo
              <ExternalLink size={14} className="ml-2" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedGameBanner;
