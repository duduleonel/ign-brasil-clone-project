
import { useMemo } from 'react';
import type { Post } from '@/types/database';

interface UseAdvancedFiltersProps {
  posts: Post[] | undefined;
  searchQuery: string;
  selectedCategory: string;
  selectedTags: string[];
  selectedAuthor: string;
  dateRange: string;
  sortBy: string;
  difficulty?: string;
}

export const useAdvancedFilters = ({
  posts,
  searchQuery,
  selectedCategory,
  selectedTags,
  selectedAuthor,
  dateRange,
  sortBy,
  difficulty
}: UseAdvancedFiltersProps) => {
  return useMemo(() => {
    if (!posts) return [];

    let filtered = posts.filter(post => {
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || 
        post.category?.slug === selectedCategory;
      
      const matchesAuthor = !selectedAuthor || 
        post.author.toLowerCase().includes(selectedAuthor.toLowerCase());

      const matchesTags = selectedTags.length === 0 || 
        (post.tags && post.tags.some(tag => selectedTags.includes(tag.slug)));

      const matchesDateRange = (() => {
        if (!dateRange || dateRange === 'all') return true;
        
        const postDate = new Date(post.created_at);
        const now = new Date();
        
        switch (dateRange) {
          case 'today':
            return postDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return postDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return postDate >= monthAgo;
          case 'year':
            const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            return postDate >= yearAgo;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesCategory && matchesAuthor && matchesTags && matchesDateRange;
    });

    // Sort posts
    switch (sortBy) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      case 'popular':
        return filtered.sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
      case 'rating':
        return filtered.sort((a, b) => (b.game?.rating || 0) - (a.game?.rating || 0));
      case 'alphabetical':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'read_time':
        return filtered.sort((a, b) => (a.read_time || 0) - (b.read_time || 0));
      default:
        return filtered;
    }
  }, [posts, searchQuery, selectedCategory, selectedTags, selectedAuthor, dateRange, sortBy, difficulty]);
};
