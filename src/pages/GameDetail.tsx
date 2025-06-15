
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Users } from 'lucide-react';
import { useGame } from '@/hooks/useGames';
import { usePosts } from '@/hooks/usePosts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ArticleCard from '@/components/ArticleCard';
import GameReviews from '@/components/GameReviews';
import GameSpecs from '@/components/GameSpecs';
import GameDownloadLinks from '@/components/GameDownloadLinks';
import GameGallery from '@/components/GameGallery';
import FavoriteButton from '@/components/FavoriteButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
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
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Game Header with Hero Image */}
            <Card className="mb-8 overflow-hidden">
              <div className="relative">
                <img 
                  src={game.featured_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e'}
                  alt={game.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                {/* Title and Meta Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h1 className="text-4xl font-bold text-white mb-4">
                        {game.title}
                      </h1>
                      
                      {/* Quick Meta Info */}
                      <div className="flex flex-wrap gap-4 text-white/90">
                        {game.release_date && (
                          <span className="flex items-center gap-1">
                            <Calendar size={16} />
                            {new Date(game.release_date).getFullYear()}
                          </span>
                        )}
                        
                        {game.genres && game.genres.length > 0 && (
                          <span>{game.genres[0].name}</span>
                        )}

                        {game.developers && game.developers.length > 0 && (
                          <span className="flex items-center gap-1">
                            <Users size={16} />
                            {game.developers[0].name}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Rating and Favorite */}
                    <div className="flex items-center gap-3">
                      {game.rating && (
                        <div className="bg-green-600 text-white px-3 py-2 rounded-lg text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Star size={16} className="text-yellow-400 fill-current mr-1" />
                            <span className="font-bold">{game.rating}</span>
                          </div>
                        </div>
                      )}
                      <FavoriteButton itemId={game.id} itemType="game" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Game Info Section */}
              <CardContent className="p-6">
                {/* Platforms and Genres */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {game.platforms && game.platforms.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Plataformas:</span>
                      {game.platforms.map((platform) => (
                        <Badge key={platform.slug} variant="outline">
                          {platform.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {game.genres && game.genres.map((genre) => (
                    <Badge key={genre.slug} className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      {genre.name}
                    </Badge>
                  ))}
                </div>

                {/* Game Summary */}
                {game.summary && (
                  <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-bold mb-4">Sobre o Jogo</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                      {game.summary}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gallery */}
            <div className="mb-8">
              <GameGallery game={game} />
            </div>

            {/* Reviews */}
            <div className="mb-8">
              <GameReviews gameId={game.id} />
            </div>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Posts Relacionados
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((post) => (
                      <ArticleCard key={post.id} post={post} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Specs */}
            <GameSpecs game={game} />

            {/* Download Links */}
            <GameDownloadLinks game={game} />

            {/* Additional Stats */}
            {(game.metacritic_score || game.price) && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Estatísticas</h3>
                  
                  {game.metacritic_score && (
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-600 dark:text-gray-400">Metacritic</span>
                      <div className={`px-2 py-1 rounded text-white text-sm font-bold ${
                        game.metacritic_score >= 75 ? 'bg-green-600' :
                        game.metacritic_score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                        {game.metacritic_score}
                      </div>
                    </div>
                  )}

                  {game.price && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Preço médio</span>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        R$ {game.price.toFixed(2)}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GameDetail;
