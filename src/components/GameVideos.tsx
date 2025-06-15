
import React from 'react';
import type { Game } from '@/types/database';

interface GameVideosProps {
  game: Game;
}

const GameVideos: React.FC<GameVideosProps> = ({ game }) => {
  if (!game.trailer_url) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>Nenhum vídeo disponível para este jogo.</p>
      </div>
    );
  }

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(game.trailer_url);

  if (!videoId) {
    return (
      <div>
        <a href={game.trailer_url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
          Assistir ao vídeo
        </a>
      </div>
    );
  }

  return (
    <div className="aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={`${game.title} trailer`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg"
      ></iframe>
    </div>
  );
};

export default GameVideos;
