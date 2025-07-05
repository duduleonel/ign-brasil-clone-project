
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

        {/* Publisher */}
        {game.publisher && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Building size={16} />
              Produtora
            </span>
            <span className="font-medium">
              {game.publisher}
            </span>
          </div>
        )}

        {/* Developer */}
        {game.developer && (
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Cpu size={16} />
              Desenvolvedora
            </span>
            <span className="font-medium">
              {game.developer}
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
                <div key={index} className="font-medium">
                  {platform}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Genre */}
        {game.genre && (
          <div className="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MemoryStick size={16} />
              Gênero
            </span>
            <div className="text-right">
              <div className="font-medium">
                {game.genre}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameSpecs;
