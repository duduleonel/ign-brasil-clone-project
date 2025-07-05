
import React from 'react';
import type { Game } from '@/types/database';

interface GameScreenshotsProps {
  game: Game;
}

const GameScreenshots: React.FC<GameScreenshotsProps> = ({ game }) => {
  // Use featured_image as fallback
  const images = game.featured_image ? [game.featured_image] : [];

  if (images.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Screenshots
        </h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Nenhuma screenshot disponível para este jogo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Screenshots
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <img 
            key={index}
            src={image}
            alt={`Screenshot ${index + 1} de ${game.title}`}
            className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
            onClick={() => window.open(image, '_blank')}
          />
        ))}
      </div>
    </div>
  );
};

export default GameScreenshots;
