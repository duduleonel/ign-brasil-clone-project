
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { Company } from '@/types/database';

interface GameFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPublisher: string;
  setSelectedPublisher: (publisher: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  publishers: Company[];
}

const GameFilters: React.FC<GameFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedPublisher,
  setSelectedPublisher,
  selectedYear,
  setSelectedYear,
  sortBy,
  setSortBy,
  publishers
}) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 20 }, (_, i) => currentYear - i);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar jogos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <select
          value={selectedPublisher}
          onChange={(e) => setSelectedPublisher(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground"
        >
          <option value="">Todas as produtoras</option>
          {publishers.map((publisher) => (
            <option key={publisher.id} value={publisher.id}>
              {publisher.name}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground"
        >
          <option value="">Todos os anos</option>
          {yearOptions.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground"
        >
          <option value="newest">Mais recentes</option>
          <option value="oldest">Mais antigos</option>
          <option value="rating">Melhor avaliação</option>
          <option value="price_low">Menor preço</option>
          <option value="price_high">Maior preço</option>
          <option value="alphabetical">A-Z</option>
        </select>
      </div>
    </div>
  );
};

export default GameFilters;
