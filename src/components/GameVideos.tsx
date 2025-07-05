
import React from 'react';
import type { Game } from '@/types/database';

interface GameVideosProps {
  game: Game;
}

const GameVideos: React.FC<GameVideosProps> = ({ game }) => {
  // Since trailer_url doesn't exist in the schema, show a placeholder
  return (
    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
      <p>Nenhum vídeo disponível para este jogo.</p>
    </div>
  );
};

export default GameVideos;
