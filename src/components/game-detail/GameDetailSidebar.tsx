
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import GameSpecs from '@/components/GameSpecs';
import GameDownloadLinks from '@/components/GameDownloadLinks';
import type { Game } from '@/types/database';

interface GameDetailSidebarProps {
  game: Game;
}

const GameDetailSidebar: React.FC<GameDetailSidebarProps> = ({ game }) => {
  return (
    <div className="space-y-6">
      {/* Game Specs */}
      <GameSpecs game={game} />

      {/* Download Links */}
      <GameDownloadLinks game={game} />

      {/* Additional Stats */}
      {(game.metacritic_score || game.price) && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold mb-4">Estatísticas</h3>
            
            {game.metacritic_score && (
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600 dark:text-gray-400">Metacritic</span>
                <div className={`px-2 py-1 rounded text-white text-sm font-bold ${
                  game.metacritic_score >= 75 ? 'bg-green-600' :
                  game.metacritic_score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                  {game.metacritic_score}
                </div>
              </div>
            )}

            {game.price && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Preço médio</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  R$ {game.price.toFixed(2)}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GameDetailSidebar;
