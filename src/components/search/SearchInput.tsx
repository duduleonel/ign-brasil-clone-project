
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  query, 
  onQueryChange, 
  placeholder = "Buscar posts, jogos..." 
}) => {
  return (
    <>
      <Search size={20} className="text-gray-500 dark:text-gray-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="border-0 bg-transparent focus-visible:ring-0 text-base"
      />
    </>
  );
};

export default SearchInput;
