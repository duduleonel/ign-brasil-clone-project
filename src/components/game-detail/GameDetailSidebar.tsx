
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
      {game.rating && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold mb-4">Estatísticas</h3>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Avaliação</span>
              <div className="px-2 py-1 rounded text-white text-sm font-bold bg-green-600">
                {game.rating}/5
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GameDetailSidebar;
