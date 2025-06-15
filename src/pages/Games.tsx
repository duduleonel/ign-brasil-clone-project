
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Grid, List, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import GameCard from '@/components/GameCard';
import GameComparator from '@/components/GameComparator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useGames } from '@/hooks/useGames';
import { useCompanies } from '@/hooks/useCompanies';

const Games = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showComparator, setShowComparator] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  const { data: games, isLoading, error } = useGames();
  const { data: companies } = useCompanies();

  const publishers = companies?.filter(c => c.type === 'publisher') || [];

  // Filter and sort games
  const filteredAndSortedGames = React.useMemo(() => {
    if (!games) return [];

    let filtered = games.filter(game => {
      const matchesSearch = !searchQuery || 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.summary?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPublisher = !selectedPublisher || 
        game.publishers?.some(p => p.id === selectedPublisher);
      
      const matchesYear = !selectedYear || 
        (game.release_date && new Date(game.release_date).getFullYear().toString() === selectedYear);

      return matchesSearch && matchesPublisher && matchesYear;
    });

    // Sort games
    switch (sortBy) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      case 'rating':
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'price_low':
        return filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price_high':
        return filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'alphabetical':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [games, searchQuery, selectedPublisher, selectedYear, sortBy]);

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 20 }, (_, i) => currentYear - i);

  const breadcrumbItems = [{ label: 'Jogos' }];

  if (error) {
    console.error('Error loading games:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Biblioteca de Jogos
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Explore nossa coleção de jogos para Mugen, Ikemen GO e OpenBOR
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={showComparator ? "default" : "outline"}
              onClick={() => setShowComparator(!showComparator)}
              className="hidden lg:flex"
            >
              Comparador
            </Button>
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </Button>
          </div>
        </div>

        {/* Game Comparator */}
        {showComparator && games && (
          <div className="mb-8">
            <GameComparator availableGames={games} />
          </div>
        )}

        {/* Filters */}
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

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {isLoading ? 'Carregando...' : `${filteredAndSortedGames.length} jogo(s) encontrado(s)`}
          </p>
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
        ) : filteredAndSortedGames.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredAndSortedGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={() => navigate(`/jogos/${game.slug}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Nenhum jogo encontrado com os filtros selecionados.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedPublisher('');
                setSelectedYear('');
                setSortBy('newest');
              }}
              className="mt-4"
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Games;
