
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GameCard from '@/components/GameCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useGames, useGenres, usePlatforms } from '@/hooks/useGames';
import { useNavigate } from 'react-router-dom';

const Games = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const { data: games, isLoading } = useGames();
  const { data: genres } = useGenres();
  const { data: platforms } = usePlatforms();

  const filteredGames = games?.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || game.genres?.some(g => g.slug === selectedGenre);
    const matchesPlatform = !selectedPlatform || game.platforms?.some(p => p.slug === selectedPlatform);
    
    return matchesSearch && matchesGenre && matchesPlatform;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header da página */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Central de Jogos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Descubra os melhores jogos de todas as plataformas
          </p>
        </div>

        {/* Filtros e busca */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 mb-8 shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar jogos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por gênero */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Todos os gêneros</option>
              {genres?.map((genre) => (
                <option key={genre.slug} value={genre.slug}>
                  {genre.name}
                </option>
              ))}
            </select>

            {/* Filtro por plataforma */}
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Todas as plataformas</option>
              {platforms?.map((platform) => (
                <option key={platform.slug} value={platform.slug}>
                  {platform.name}
                </option>
              ))}
            </select>

            {/* Botão limpar filtros */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('');
                setSelectedPlatform('');
              }}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        </div>

        {/* Grade de jogos */}
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
        ) : filteredGames && filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
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
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Games;
