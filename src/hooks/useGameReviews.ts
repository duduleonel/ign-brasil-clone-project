
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { GameReview } from '@/types/database';

export const useGameReviews = (gameId: string) => {
  return useQuery({
    queryKey: ['game-reviews', gameId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('game_reviews')
        .select('*')
        .eq('game_id', gameId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching game reviews:', error);
        throw error;
      }

      return data as GameReview[];
    },
  });
};

export const useCreateGameReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (review: Omit<GameReview, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('game_reviews')
        .insert([review])
        .select()
        .single();

      if (error) {
        console.error('Error creating game review:', error);
        throw error;
      }

      return data as GameReview;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['game-reviews', data.game_id] });
    },
  });
};
