
import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SearchFilters as SearchFiltersType } from '@/hooks/useSearchFilters';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  hasActiveFilters: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleCategory: (category: string) => void;
  onToggleTag: (tag: string) => void;
  onSetDateRange: (dateRange: string) => void;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  hasActiveFilters,
  isOpen,
  onOpenChange,
  onToggleCategory,
  onToggleTag,
  onSetDateRange,
  onClearFilters
}) => {
  const categories = [
    'noticias', 'reportagens', 'entrevistas', 'reviews', 
    'tutoriais', 'downloads', 'mugen', 'ikemen-go', 'openbor'
  ];

  const popularTags = [
    'street-fighter', 'kof', 'dragon-ball', 'anime', 'sprites', 
    'stages', 'chars', 'screenpack', 'lifebar'
  ];

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
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
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
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
                  onClick={() => onToggleCategory(category)}
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
                  onClick={() => onToggleTag(tag)}
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
              onChange={(e) => onSetDateRange(e.target.value)}
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
  );
};

export default SearchFilters;
