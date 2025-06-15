
import React from 'react';
import { Calendar, Building2, Users } from 'lucide-react';
import type { Game } from '@/types/database';

interface GameMetadataProps {
  game: Game;
}

const GameMetadata: React.FC<GameMetadataProps> = ({ game }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Release Date */}
      {game.release_date && (
        <div className="flex items-center">
          <Calendar size={20} className="mr-3 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Data de Lançamento</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {new Date(game.release_date).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      )}

      {/* Publishers */}
      {game.publishers && game.publishers.length > 0 && (
        <div className="flex items-start">
          <Building2 size={20} className="mr-3 text-gray-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Produtora</p>
            <div className="space-y-1">
              {game.publishers.map((publisher) => (
                <p key={publisher.slug} className="font-medium text-gray-900 dark:text-white">
                  {publisher.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Developers */}
      {game.developers && game.developers.length > 0 && (
        <div className="flex items-start">
          <Users size={20} className="mr-3 text-gray-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Desenvolvedora</p>
            <div className="space-y-1">
              {game.developers.map((developer) => (
                <p key={developer.slug} className="font-medium text-gray-900 dark:text-white">
                  {developer.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameMetadata;
