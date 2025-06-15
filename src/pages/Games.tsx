import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import GameComparator from '@/components/GameComparator';
import GameFilters from '@/components/games/GameFilters';
import GameViewControls from '@/components/games/GameViewControls';
import GameResults from '@/components/games/GameResults';
import { useGames } from '@/hooks/useGames';
import { usePublishers, useDevelopers, usePlatforms } from '@/hooks/useCompanies';
import { useGameFilters } from '@/hooks/useGameFilters';

const Games = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showComparator, setShowComparator] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState<string>('');
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  const { data: games, isLoading, error } = useGames();
  const { data: publishers } = usePublishers();
  const { data: developers } = useDevelopers();
  const { data: platforms } = usePlatforms();

  const filteredAndSortedGames = useGameFilters({
    games,
    searchQuery,
    selectedPublisher,
    selectedDeveloper,
    selectedPlatform,
    selectedYear,
    sortBy
  });

  const breadcrumbItems = [{ label: 'Jogos' }];

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedPublisher('');
    setSelectedDeveloper('');
    setSelectedPlatform('');
    setSelectedYear('');
    setSortBy('newest');
  };

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

          <GameViewControls
            viewMode={viewMode}
            setViewMode={setViewMode}
            showComparator={showComparator}
            setShowComparator={setShowComparator}
          />
        </div>

        {showComparator && games && (
          <div className="mb-8">
            <GameComparator availableGames={games} />
          </div>
        )}

        <GameFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedPublisher={selectedPublisher}
          setSelectedPublisher={setSelectedPublisher}
          selectedDeveloper={selectedDeveloper}
          setSelectedDeveloper={setSelectedDeveloper}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          sortBy={sortBy}
          setSortBy={setSortBy}
          publishers={publishers || []}
          developers={developers || []}
          platforms={platforms || []}
        />

        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {isLoading ? 'Carregando...' : `${filteredAndSortedGames.length} jogo(s) encontrado(s)`}
          </p>
        </div>

        <GameResults
          games={filteredAndSortedGames}
          isLoading={isLoading}
          viewMode={viewMode}
          onClearFilters={handleClearFilters}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Games;
