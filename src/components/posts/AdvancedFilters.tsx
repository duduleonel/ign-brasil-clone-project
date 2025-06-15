
import React from 'react';
import { Search, Filter, X, Calendar, User, Tag, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface AdvancedFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  selectedAuthor: string;
  setSelectedAuthor: (author: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  difficulty?: string;
  setDifficulty?: (difficulty: string) => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTags,
  setSelectedTags,
  selectedAuthor,
  setSelectedAuthor,
  dateRange,
  setDateRange,
  sortBy,
  setSortBy,
  difficulty,
  setDifficulty
}) => {
  const categories = [
    { value: '', label: 'Todas as categorias' },
    { value: 'noticias', label: 'Notícias' },
    { value: 'reportagens', label: 'Reportagens' },
    { value: 'entrevistas', label: 'Entrevistas' },
    { value: 'reviews', label: 'Reviews' },
    { value: 'tutoriais', label: 'Tutoriais' },
    { value: 'downloads', label: 'Downloads' },
    { value: 'mugen', label: 'Mugen' },
    { value: 'ikemen-go', label: 'Ikemen GO' },
    { value: 'openbor', label: 'OpenBOR' }
  ];

  const popularTags = [
    'street-fighter', 'kof', 'dragon-ball', 'anime', 'sprites', 
    'stages', 'chars', 'screenpack', 'lifebar', 'tutorial-basico',
    'tutorial-avancado', 'download-gratuito', 'premium'
  ];

  const authors = [
    'Ana Martinez', 'Carlos Silva', 'Maria Santos', 'João Pedro',
    'Fernanda Costa', 'Ricardo Lima', 'Paula Oliveira'
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTags([]);
    setSelectedAuthor('');
    setDateRange('all');
    setSortBy('newest');
    if (setDifficulty) setDifficulty('');
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedTags.length > 0 || 
                          selectedAuthor || dateRange !== 'all' || difficulty;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>

        {/* Author */}
        <select
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground"
        >
          <option value="">Todos os autores</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>

        {/* Date Range */}
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground"
        >
          <option value="all">Todos os períodos</option>
          <option value="today">Hoje</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mês</option>
          <option value="year">Este ano</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground"
        >
          <option value="newest">Mais recentes</option>
          <option value="oldest">Mais antigos</option>
          <option value="popular">Mais populares</option>
          <option value="rating">Melhor avaliação</option>
          <option value="alphabetical">A-Z</option>
          <option value="read_time">Tempo de leitura</option>
        </select>
      </div>

      {/* Tutorial Difficulty (only for tutorials) */}
      {selectedCategory === 'tutoriais' && setDifficulty && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Dificuldade:</label>
          <select
            value={difficulty || ''}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground"
          >
            <option value="">Todas as dificuldades</option>
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>
        </div>
      )}

      {/* Tags */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Tags Populares:</h4>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Filtros ativos:</span>
          {selectedCategory && (
            <Badge variant="secondary" className="text-xs">
              Categoria: {categories.find(c => c.value === selectedCategory)?.label}
              <X 
                size={12} 
                className="ml-1 cursor-pointer" 
                onClick={() => setSelectedCategory('')}
              />
            </Badge>
          )}
          {selectedAuthor && (
            <Badge variant="secondary" className="text-xs">
              Autor: {selectedAuthor}
              <X 
                size={12} 
                className="ml-1 cursor-pointer" 
                onClick={() => setSelectedAuthor('')}
              />
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
              <X 
                size={12} 
                className="ml-1 cursor-pointer" 
                onClick={() => toggleTag(tag)}
              />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X size={16} className="mr-1" />
            Limpar todos
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;
