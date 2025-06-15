
import React from 'react';
import type { Game } from '@/types/database';

interface GameScreenshotsProps {
  game: Game;
}

const GameScreenshots: React.FC<GameScreenshotsProps> = ({ game }) => {
  if (!game.screenshots || game.screenshots.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Screenshots
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {game.screenshots.map((screenshot, index) => (
          <img 
            key={index}
            src={screenshot}
            alt={`Screenshot ${index + 1} de ${game.title}`}
            className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
            onClick={() => window.open(screenshot, '_blank')}
          />
        ))}
      </div>
    </div>
  );
};

export default GameScreenshots;
