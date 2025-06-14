
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
          game:games(id, title, slug, summary, featured_image, cartridge_image, release_date, created_at, updated_at),
          tags:post_tags(tag:tags(id, name, slug, description, created_at))
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      if (categorySlug) {
        // Fix: Use inner join to filter by category slug
        query = query.eq('category.slug', categorySlug);
      }

      if (gameId) {
        query = query.eq('game_id', gameId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }

      // Filter out posts without categories when categorySlug is specified
      const filteredData = categorySlug 
        ? data?.filter(post => post.category?.slug === categorySlug) || []
        : data || [];

      const formattedData = filteredData.map(post => ({
        ...post,
        tags: post.tags ? post.tags.map((t: any) => t.tag) : []
      }));

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
          game:games(id, title, slug, summary, featured_image, cartridge_image, release_date, created_at, updated_at),
          tags:post_tags(tag:tags(id, name, slug, description, created_at))
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        throw error;
      }

      if (!data) {
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
