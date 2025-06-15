
import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface SearchFilters {
  categories: string[];
  tags: string[];
  dateRange: string;
}

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Buscar posts, jogos..." 
}) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    tags: [],
    dateRange: 'all'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    'noticias', 'reportagens', 'entrevistas', 'reviews', 
    'tutoriais', 'downloads', 'mugen', 'ikemen-go', 'openbor'
  ];

  const popularTags = [
    'street-fighter', 'kof', 'dragon-ball', 'anime', 'sprites', 
    'stages', 'chars', 'screenpack', 'lifebar'
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query, filters);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, filters, onSearch]);

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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
        <Search size={20} className="text-gray-500 dark:text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-0 bg-transparent focus-visible:ring-0 text-base"
        />
        
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className={`relative ${hasActiveFilters ? 'text-green-600 dark:text-green-400' : ''}`}
            >
              <Filter size={18} />
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-600 rounded-full"></span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filtros</h3>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X size={16} className="mr-1" />
                    Limpar
                  </Button>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Categorias</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={filters.categories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => toggleCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Tags Populares</h4>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={filters.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Período</h4>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full p-2 border rounded-md bg-background"
                >
                  <option value="all">Todos os períodos</option>
                  <option value="today">Hoje</option>
                  <option value="week">Esta semana</option>
                  <option value="month">Este mês</option>
                  <option value="year">Este ano</option>
                </select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {filters.categories.map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
              <X 
                size={12} 
                className="ml-1 cursor-pointer" 
                onClick={() => toggleCategory(category)}
              />
            </Badge>
          ))}
          {filters.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
              <X 
                size={12} 
                className="ml-1 cursor-pointer" 
                onClick={() => toggleTag(tag)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
