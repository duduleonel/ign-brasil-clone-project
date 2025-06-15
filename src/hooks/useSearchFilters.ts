
import { useState } from 'react';

export interface SearchFilters {
  categories: string[];
  tags: string[];
  dateRange: string;
}

export const useSearchFilters = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    tags: [],
    dateRange: 'all'
  });

  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const setDateRange = (dateRange: string) => {
    setFilters(prev => ({ ...prev, dateRange }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      tags: [],
      dateRange: 'all'
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || 
                          filters.tags.length > 0 || 
                          filters.dateRange !== 'all';

  return {
    filters,
    toggleCategory,
    toggleTag,
    setDateRange,
    clearFilters,
    hasActiveFilters
  };
};
