
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedPosts from '@/components/RelatedPosts';
import { Skeleton } from '@/components/ui/skeleton';
import { useGame } from '@/hooks/useGames';

const GameDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: game, isLoading, error } = useGame(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Jogo não encontrado
            </h1>
            <button
              onClick={() => navigate('/jogos')}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Voltar para jogos
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate('/jogos')}
          className="flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-500 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar para jogos
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Coluna principal */}
          <div className="lg:col-span-2">
            {/* Imagem principal */}
            <div className="relative mb-6">
              <img 
                src={game.featured_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e'}
                alt={game.title}
                className="w-full h-64 lg:h-96 object-cover rounded-lg"
              />
            </div>

            {/* Título e sumário */}
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {game.title}
            </h1>

            {game.summary && (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 mb-6 shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Sumário</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {game.summary}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar com informações */}
          <div className="space-y-6">
            {/* Imagem do cartucho */}
            {game.cartridge_image && (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Cartucho</h3>
                <img 
                  src={game.cartridge_image}
                  alt={`Cartucho ${game.title}`}
                  className="w-full max-w-48 mx-auto object-cover rounded-lg"
                />
              </div>
            )}

            {/* Informações gerais */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Informações</h3>
              
              {game.release_date && (
                <div className="mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 block">Data de lançamento</span>
                  <span className="text-gray-900 dark:text-white font-medium flex items-center">
                    <Calendar size={16} className="mr-2" />
                    {new Date(game.release_date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              )}

              {game.publishers && game.publishers.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 block">Produtora</span>
                  <div className="flex flex-wrap gap-2">
                    {game.publishers.map((publisher) => (
                      <span key={publisher.slug} className="text-gray-900 dark:text-white">
                        {publisher.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {game.developers && game.developers.length > 0 && (
                <div className="mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 block">Desenvolvedora</span>
                  <div className="flex flex-wrap gap-2">
                    {game.developers.map((developer) => (
                      <span key={developer.slug} className="text-gray-900 dark:text-white">
                        {developer.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Gêneros */}
            {game.genres && game.genres.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Gêneros</h3>
                <div className="flex flex-wrap gap-2">
                  {game.genres.map((genre) => (
                    <span 
                      key={genre.slug}
                      className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Plataformas */}
            {game.platforms && game.platforms.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Plataformas</h3>
                <div className="grid grid-cols-2 gap-2">
                  {game.platforms.map((platform) => (
                    <div key={platform.slug} className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {platform.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Posts relacionados */}
        <RelatedPosts gameId={game.id} gameTitle={game.title} />
      </main>

      <Footer />
    </div>
  );
};

export default GameDetail;
