
import React, { useState, useEffect } from 'react';
import SearchInput from './search/SearchInput';
import SearchFilters from './search/SearchFilters';
import ActiveFilters from './search/ActiveFilters';
import { useSearchFilters, SearchFilters as SearchFiltersType } from '@/hooks/useSearchFilters';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFiltersType) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Buscar posts, jogos..." 
}) => {
  const [query, setQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    filters,
    toggleCategory,
    toggleTag,
    setDateRange,
    clearFilters,
    hasActiveFilters
  } = useSearchFilters();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query, filters);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, filters, onSearch]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
        <SearchInput
          query={query}
          onQueryChange={setQuery}
          placeholder={placeholder}
        />
        
        <SearchFilters
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          isOpen={isFilterOpen}
          onOpenChange={setIsFilterOpen}
          onToggleCategory={toggleCategory}
          onToggleTag={toggleTag}
          onSetDateRange={setDateRange}
          onClearFilters={clearFilters}
        />
      </div>

      <ActiveFilters
        filters={filters}
        onToggleCategory={toggleCategory}
        onToggleTag={toggleTag}
      />
    </div>
  );
};

export default SearchBar;
