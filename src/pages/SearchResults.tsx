
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import Breadcrumb from '@/components/Breadcrumb';
import ArticleCard from '@/components/ArticleCard';
import GameCard from '@/components/GameCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { usePosts } from '@/hooks/usePosts';
import { useGames } from '@/hooks/useGames';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [activeTab, setActiveTab] = useState<'all' | 'posts' | 'games'>('all');
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchFilters, setSearchFilters] = useState({
    categories: [],
    tags: [],
    dateRange: 'all'
  });

  const { data: posts, isLoading: postsLoading } = usePosts(50);
  const { data: games, isLoading: gamesLoading } = useGames(50);

  // Filtrar resultados baseado na busca
  const filteredPosts = posts?.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredGames = games?.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.summary?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const totalResults = filteredPosts.length + filteredGames.length;

  const handleSearch = (newQuery: string, filters: any) => {
    setSearchQuery(newQuery);
    setSearchFilters(filters);
  };

  useEffect(() => {
    if (query !== searchQuery) {
      setSearchQuery(query);
    }
  }, [query]);

  const breadcrumbItems = [
    { label: 'Busca', href: '/busca' },
    { label: `"${searchQuery}"` }
  ];

  const isLoading = postsLoading || gamesLoading;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} placeholder="Buscar posts, jogos..." />
        </div>

        {searchQuery && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Resultados para "{searchQuery}"
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isLoading ? 'Buscando...' : `${totalResults} resultado(s) encontrado(s)`}
            </p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === 'all'
                ? 'border-green-600 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
            }`}
          >
            Todos ({totalResults})
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === 'posts'
                ? 'border-green-600 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
            }`}
          >
            Posts ({filteredPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`pb-2 px-1 border-b-2 transition-colors ${
              activeTab === 'games'
                ? 'border-green-600 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
            }`}
          >
            Jogos ({filteredGames.length})
          </button>
        </div>

        {isLoading ? (
          <LoadingSpinner size="lg" text="Buscando resultados..." />
        ) : (
          <>
            {/* Posts Results */}
            {(activeTab === 'all' || activeTab === 'posts') && filteredPosts.length > 0 && (
              <section className="mb-12">
                {activeTab === 'all' && (
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Posts
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.slice(0, activeTab === 'all' ? 6 : undefined).map((post) => (
                    <ArticleCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* Games Results */}
            {(activeTab === 'all' || activeTab === 'games') && filteredGames.length > 0 && (
              <section className="mb-12">
                {activeTab === 'all' && (
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Jogos
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.slice(0, activeTab === 'all' ? 8 : undefined).map((game) => (
                    <GameCard 
                      key={game.id} 
                      game={game} 
                      onClick={() => navigate(`/jogos/${game.slug}`)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* No Results */}
            {totalResults === 0 && searchQuery && (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-600 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Tente buscar com outros termos ou remova alguns filtros.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
