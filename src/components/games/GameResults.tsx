
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from '@/components/GameCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { Game } from '@/types/database';

interface GameResultsProps {
  games: Game[];
  isLoading: boolean;
  viewMode: 'grid' | 'list';
  onClearFilters: () => void;
}

const GameResults: React.FC<GameResultsProps> = ({
  games,
  isLoading,
  viewMode,
  onClearFilters
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Nenhum jogo encontrado com os filtros selecionados.
        </p>
        <Button onClick={onClearFilters} className="mt-4">
          Limpar filtros
        </Button>
      </div>
    );
  }

  return (
    <div className={viewMode === 'grid' 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      : "space-y-4"
    }>
      {games.map((game) => (
        <GameCard 
          key={game.id} 
          game={game} 
          onClick={() => navigate(`/jogos/${game.slug}`)}
        />
      ))}
    </div>
  );
};

export default GameResults;
