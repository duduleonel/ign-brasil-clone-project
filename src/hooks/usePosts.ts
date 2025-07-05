
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Post } from '@/types/database';

export const usePosts = (limit?: number, categorySlug?: string, gameId?: string) => {
  return useQuery({
    queryKey: ['posts', limit, categorySlug, gameId],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select(`
          *,
          category:categories(id, name, slug, description, created_at),
          game:games(id, title, slug, summary, featured_image, release_date, created_at, updated_at),
          tags:post_tags(tag:tags(id, name, slug, description, created_at))
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      if (gameId) {
        query = query.eq('game_id', gameId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }

      // Filter by category slug if specified
      let filteredData = data || [];
      if (categorySlug) {
        filteredData = data?.filter(post => post.category?.slug === categorySlug) || [];
      }

      const formattedData = filteredData.map(post => ({
        ...post,
        tags: post.tags ? post.tags.map((t: any) => t.tag) : []
      }));

      console.log(`Posts for category ${categorySlug}:`, formattedData);
      return formattedData as Post[];
    },
  });
};

export const usePost = (slug: string) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(id, name, slug, description, created_at),
          game:games(id, title, slug, summary, featured_image, release_date, created_at, updated_at),
          tags:post_tags(tag:tags(id, name, slug, description, created_at))
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();

      if (error) {
        console.error('Error fetching post:', error);
        throw error;
      }
      if (!data) {
        console.warn('[usePost] Nenhum post encontrado para o slug:', slug);
        return null;
      }
      const formattedData = {
        ...data,
        tags: data.tags ? data.tags.map((t: any) => t.tag) : []
      };

      return formattedData as Post;
    },
  });
};
