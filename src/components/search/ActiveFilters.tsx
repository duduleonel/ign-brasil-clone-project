
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SearchFilters } from '@/hooks/useSearchFilters';

interface ActiveFiltersProps {
  filters: SearchFilters;
  onToggleCategory: (category: string) => void;
  onToggleTag: (tag: string) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onToggleCategory,
  onToggleTag
}) => {
  const hasActiveFilters = filters.categories.length > 0 || filters.tags.length > 0;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {filters.categories.map((category) => (
        <Badge key={category} variant="secondary" className="text-xs">
          {category}
          <X 
            size={12} 
            className="ml-1 cursor-pointer" 
            onClick={() => onToggleCategory(category)}
          />
        </Badge>
      ))}
      {filters.tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="text-xs">
          #{tag}
          <X 
            size={12} 
            className="ml-1 cursor-pointer" 
            onClick={() => onToggleTag(tag)}
          />
        </Badge>
      ))}
    </div>
  );
};

export default ActiveFilters;
