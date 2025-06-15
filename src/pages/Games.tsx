
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Calendar, Monitor, SlidersHorizontal } from 'lucide-react';
import { useGames } from '@/hooks/useGames';
import { useCompanies, useGenres, usePlatforms } from '@/hooks/useCompanies';
import GameCard from '@/components/GameCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Games = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedPublisher, setSelectedPublisher] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>('newest');
  
  const { data: games, isLoading, error } = useGames(undefined, selectedGenre, selectedPlatform, selectedPublisher, selectedYear);
  const { data: genres } = useGenres();
  const { data: platforms } = usePlatforms();
  const { data: publishers } = useCompanies('publisher');

  // Generate year options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const filteredGames = games?.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  })?.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  }) || [];

  const handleGameClick = (slug: string) => {
    navigate(`/jogos/${slug}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
    setSelectedPlatform('');
    setSelectedPublisher('');
    setSelectedYear(0);
    setSortBy('newest');
  };

  const hasActiveFilters = searchTerm || selectedGenre || selectedPlatform || selectedPublisher || selectedYear || sortBy !== 'newest';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Central de Jogos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Descubra os melhores jogos com informações detalhadas, screenshots e análises completas.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
          {/* Basic Search */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Buscar jogos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Todos os gêneros</option>
              {genres?.map(genre => (
                <option key={genre.id} value={genre.slug}>{genre.name}</option>
              ))}
            </select>

            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">Todas as plataformas</option>
              {platforms?.map(platform => (
                <option key={platform.id} value={platform.slug}>{platform.name}</option>
              ))}
            </select>

            <Button 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <SlidersHorizontal size={16} />
              Filtros Avançados
            </Button>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Produtora
                  </label>
                  <select
                    value={selectedPublisher}
                    onChange={(e) => setSelectedPublisher(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Todas as produtoras</option>
                    {publishers?.map(publisher => (
                      <option key={publisher.id} value={publisher.slug}>{publisher.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ano de Lançamento
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value={0}>Todos os anos</option>
                    {yearOptions.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ordenar por
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="newest">Mais recentes</option>
                    <option value="oldest">Mais antigos</option>
                    <option value="title">Título (A-Z)</option>
                    <option value="rating">Melhor avaliação</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <Button onClick={clearFilters} variant="outline" className="w-full">
                    <Filter size={16} className="mr-2" />
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary">
                  Busca: {searchTerm}
                </Badge>
              )}
              {selectedGenre && (
                <Badge variant="secondary">
                  Gênero: {genres?.find(g => g.slug === selectedGenre)?.name}
                </Badge>
              )}
              {selectedPlatform && (
                <Badge variant="secondary">
                  Plataforma: {platforms?.find(p => p.slug === selectedPlatform)?.name}
                </Badge>
              )}
              {selectedPublisher && (
                <Badge variant="secondary">
                  Produtora: {publishers?.find(p => p.slug === selectedPublisher)?.name}
                </Badge>
              )}
              {selectedYear > 0 && (
                <Badge variant="secondary">
                  Ano: {selectedYear}
                </Badge>
              )}
              {sortBy !== 'newest' && (
                <Badge variant="secondary">
                  Ordenação: {
                    sortBy === 'oldest' ? 'Mais antigos' :
                    sortBy === 'title' ? 'Título (A-Z)' :
                    sortBy === 'rating' ? 'Melhor avaliação' : sortBy
                  }
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Games Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
                Erro ao carregar jogos
              </h3>
              <p className="text-red-600 dark:text-red-300">
                Não foi possível carregar a lista de jogos. Tente novamente mais tarde.
              </p>
            </div>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Nenhum jogo encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tente ajustar os filtros ou buscar por outros termos.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredGames.length} {filteredGames.length === 1 ? 'jogo encontrado' : 'jogos encontrados'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onClick={() => handleGameClick(game.slug)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Games;
