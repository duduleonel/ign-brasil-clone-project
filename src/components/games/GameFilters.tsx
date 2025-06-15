
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Company } from '@/types/database';

interface GameFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPublisher: string;
  setSelectedPublisher: (publisher: string) => void;
  selectedDeveloper: string;
  setSelectedDeveloper: (developer: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  publishers: Company[];
  developers: Company[];
  platforms: any[];
}

const GameFilters: React.FC<GameFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedPublisher,
  setSelectedPublisher,
  selectedDeveloper,
  setSelectedDeveloper,
  selectedPlatform,
  setSelectedPlatform,
  selectedYear,
  setSelectedYear,
  sortBy,
  setSortBy,
  publishers,
  developers,
  platforms
}) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 20 }, (_, i) => currentYear - i);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
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
        
        <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
          <SelectTrigger>
            <SelectValue placeholder="Produtora" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as produtoras</SelectItem>
            {publishers.map((publisher) => (
              <SelectItem key={publisher.id} value={publisher.id}>
                {publisher.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDeveloper} onValueChange={setSelectedDeveloper}>
          <SelectTrigger>
            <SelectValue placeholder="Editora" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as editoras</SelectItem>
            {developers.map((developer) => (
              <SelectItem key={developer.id} value={developer.id}>
                {developer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
          <SelectTrigger>
            <SelectValue placeholder="Plataforma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas as plataformas</SelectItem>
            {platforms.map((platform) => (
              <SelectItem key={platform.id} value={platform.id}>
                {platform.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger>
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os anos</SelectItem>
            {yearOptions.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Mais recentes</SelectItem>
            <SelectItem value="oldest">Mais antigos</SelectItem>
            <SelectItem value="rating">Melhor avaliação</SelectItem>
            <SelectItem value="price_low">Menor preço</SelectItem>
            <SelectItem value="price_high">Maior preço</SelectItem>
            <SelectItem value="alphabetical">A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default GameFilters;
