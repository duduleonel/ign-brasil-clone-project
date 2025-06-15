
import React from 'react';
import { Monitor, HardDrive, Cpu, MemoryStick, Calendar, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Game } from '@/types/database';

interface GameSpecsProps {
  game: Game;
}

const GameSpecs: React.FC<GameSpecsProps> = ({ game }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor size={20} />
          Especificações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Release Date */}
        {game.release_date && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar size={16} />
              Data de Lançamento
            </span>
            <span className="font-medium">
              {new Date(game.release_date).toLocaleDateString('pt-BR')}
            </span>
          </div>
        )}

        {/* Publishers */}
        {game.publishers && game.publishers.length > 0 && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Building size={16} />
              Produtora
            </span>
            <span className="font-medium">
              {game.publishers.map(p => p.name).join(', ')}
            </span>
          </div>
        )}

        {/* Developers */}
        {game.developers && game.developers.length > 0 && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Cpu size={16} />
              Desenvolvedora
            </span>
            <span className="font-medium">
              {game.developers.map(d => d.name).join(', ')}
            </span>
          </div>
        )}

        {/* Platforms */}
        {game.platforms && game.platforms.length > 0 && (
          <div className="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Monitor size={16} />
              Plataformas
            </span>
            <div className="text-right">
              {game.platforms.map((platform, index) => (
                <div key={platform.slug} className="font-medium">
                  {platform.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Genres */}
        {game.genres && game.genres.length > 0 && (
          <div className="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MemoryStick size={16} />
              Gêneros
            </span>
            <div className="text-right">
              {game.genres.map((genre, index) => (
                <div key={genre.slug} className="font-medium">
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ESRB Rating */}
        {game.esrb_rating && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400">
              Classificação ESRB
            </span>
            <span className="font-medium bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
              {game.esrb_rating}
            </span>
          </div>
        )}

        {/* Price */}
        {game.price && (
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 dark:text-gray-400">
              Preço
            </span>
            <span className="font-bold text-green-600 dark:text-green-400 text-lg">
              R$ {game.price.toFixed(2)}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameSpecs;
