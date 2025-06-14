
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Post } from '@/types/database';

export const usePosts = (limit?: number, categorySlug?: string) => {
  return useQuery({
    queryKey: ['posts', limit, categorySlug],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select(`
          *,
          category:categories(id, name, slug, description, created_at),
          tags:post_tags(tag:tags(id, name, slug, description, created_at))
        `)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      if (categorySlug) {
        query = query.eq('categories.slug', categorySlug);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }

      return data as Post[];
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
          tags:post_tags(tag:tags(id, name, slug, description, created_at))
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        throw error;
      }

      return data as Post;
    },
  });
};
