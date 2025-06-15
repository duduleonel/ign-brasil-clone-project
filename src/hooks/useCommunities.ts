
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Community } from '@/types/database';

export const useCommunities = (limit?: number) => {
  return useQuery({
    queryKey: ['communities', limit],
    queryFn: async () => {
      let query = supabase
        .from('communities')
        .select(`
          *,
          images:community_images(*)
        `)
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching communities:', error);
        throw error;
      }

      return data as Community[];
    },
  });
};

export const useCommunity = (slug: string) => {
  return useQuery({
    queryKey: ['community', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('communities')
        .select(`
          *,
          images:community_images(*)
        `)
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching community:', error);
        throw error;
      }

      return data as Community;
    },
  });
};
