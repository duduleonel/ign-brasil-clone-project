
import { useMemo } from 'react';
import type { Game } from '@/types/database';

interface UseGameFiltersProps {
  games: Game[] | undefined;
  searchQuery: string;
  selectedPublisher: string;
  selectedYear: string;
  sortBy: string;
}

export const useGameFilters = ({
  games,
  searchQuery,
  selectedPublisher,
  selectedYear,
  sortBy
}: UseGameFiltersProps) => {
  return useMemo(() => {
    if (!games) return [];

    let filtered = games.filter(game => {
      const matchesSearch = !searchQuery || 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.summary?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPublisher = !selectedPublisher || 
        game.publishers?.some(p => p.id === selectedPublisher);
      
      const matchesYear = !selectedYear || 
        (game.release_date && new Date(game.release_date).getFullYear().toString() === selectedYear);

      return matchesSearch && matchesPublisher && matchesYear;
    });

    // Sort games
    switch (sortBy) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      case 'rating':
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'price_low':
        return filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price_high':
        return filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'alphabetical':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [games, searchQuery, selectedPublisher, selectedYear, sortBy]);
};
