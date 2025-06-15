
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useGame } from '@/hooks/useGames';
import { usePosts } from '@/hooks/usePosts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ArticleCard from '@/components/ArticleCard';
import GameReviews from '@/components/GameReviews';
import GameHeader from '@/components/GameHeader';
import GameInfo from '@/components/GameInfo';
import GameMetadata from '@/components/GameMetadata';
import GameScreenshots from '@/components/GameScreenshots';
import { Button } from '@/components/ui/button';
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

  const breadcrumbItems = [
    { label: 'Jogos', href: '/jogos' },
    { label: game?.title || 'Carregando...' }
  ];

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
          <Breadcrumb items={[{ label: 'Jogos', href: '/jogos' }, { label: 'Jogo não encontrado' }]} />
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
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/jogos')}
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Voltar para Jogos
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Cover Image Sidebar */}
          <div className="lg:col-span-1">
            <GameInfo game={game} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Game Header */}
            <GameHeader game={game} />

            {/* Game Info Grid */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
              <GameMetadata game={game} />
            </div>

            {/* Screenshots */}
            <GameScreenshots game={game} />

            {/* Reviews */}
            <div className="mb-8">
              <GameReviews gameId={game.id} />
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GameDetail;
