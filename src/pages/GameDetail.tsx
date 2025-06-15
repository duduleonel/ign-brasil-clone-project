
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Monitor, Building2, Users, ExternalLink } from 'lucide-react';
import { useGame } from '@/hooks/useGames';
import { usePosts } from '@/hooks/usePosts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const GameDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  if (!slug) {
    navigate('/jogos');
    return null;
  }

  const { data: game, isLoading: gameLoading, error: gameError } = useGame(slug);
  const { data: relatedPosts, isLoading: postsLoading } = usePosts(6, undefined, game?.id);

  if (gameLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-96 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (gameError || !game) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
                Jogo não encontrado
              </h3>
              <p className="text-red-600 dark:text-red-300 mb-4">
                O jogo que você está procurando não foi encontrado.
              </p>
              <Button onClick={() => navigate('/jogos')}>
                Voltar para Jogos
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/jogos')}
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Voltar para Jogos
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Game Header */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mb-8">
              <img 
                src={game.featured_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e'}
                alt={game.title}
                className="w-full h-96 object-cover"
              />
              
              <div className="p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {game.title}
                </h1>
                
                {/* Platforms */}
                {game.platforms && game.platforms.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.platforms.map((platform) => (
                      <Badge key={platform.slug} variant="outline" className="flex items-center gap-1">
                        <Monitor size={14} />
                        {platform.name}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Genres */}
                {game.genres && game.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {game.genres.map((genre) => (
                      <Badge key={genre.slug} className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Summary */}
                {game.summary && (
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                      {game.summary}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Posts Relacionados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((post) => (
                    <ArticleCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cartridge Image */}
            {game.cartridge_image && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Cartucho
                </h3>
                <img 
                  src={game.cartridge_image}
                  alt={`Cartucho de ${game.title}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Game Info */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Informações do Jogo
              </h3>
              
              <div className="space-y-4">
                {/* Release Date */}
                {game.release_date && (
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-3 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Data de Lançamento</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(game.release_date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Publishers */}
                {game.publishers && game.publishers.length > 0 && (
                  <div className="flex items-start">
                    <Building2 size={16} className="mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Produtora</p>
                      <div className="space-y-1">
                        {game.publishers.map((publisher) => (
                          <p key={publisher.slug} className="font-medium text-gray-900 dark:text-white">
                            {publisher.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Developers */}
                {game.developers && game.developers.length > 0 && (
                  <div className="flex items-start">
                    <Users size={16} className="mr-3 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Desenvolvedora</p>
                      <div className="space-y-1">
                        {game.developers.map((developer) => (
                          <p key={developer.slug} className="font-medium text-gray-900 dark:text-white">
                            {developer.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GameDetail;
