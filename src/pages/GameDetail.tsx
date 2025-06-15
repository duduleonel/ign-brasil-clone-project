
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Monitor, Building2, Users, ExternalLink, Star, Play } from 'lucide-react';
import { useGame } from '@/hooks/useGames';
import { usePosts } from '@/hooks/usePosts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import GameReviews from '@/components/GameReviews';
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Cover Image - Similar to Magzine style */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden sticky top-8">
              {game.cover_image && (
                <div className="aspect-[3/4] relative">
                  <img 
                    src={game.cover_image}
                    alt={`Capa de ${game.title}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}
              
              <div className="p-4">
                {/* Rating */}
                {game.rating && (
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-green-600 text-white px-4 py-2 rounded-lg text-center">
                      <div className="flex items-center justify-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16}
                            className={`${i < Math.round(game.rating!) ? 'text-yellow-400 fill-current' : 'text-white/50'}`}
                          />
                        ))}
                      </div>
                      <span className="text-2xl font-bold">{game.rating}</span>
                      <div className="text-xs opacity-75">Nota</div>
                    </div>
                  </div>
                )}

                {/* Metacritic Score */}
                {game.metacritic_score && (
                  <div className="text-center mb-4">
                    <div className={`inline-block px-3 py-1 rounded text-white font-bold ${
                      game.metacritic_score >= 75 ? 'bg-green-600' :
                      game.metacritic_score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {game.metacritic_score}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Metacritic
                    </div>
                  </div>
                )}

                {/* Price */}
                {game.price && (
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      R$ {game.price.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Preço
                    </div>
                  </div>
                )}

                {/* ESRB Rating */}
                {game.esrb_rating && (
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {game.esrb_rating}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Game Header */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mb-8">
              {/* Featured Image */}
              <div className="relative">
                <img 
                  src={game.featured_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e'}
                  alt={game.title}
                  className="w-full h-96 object-cover"
                />
                
                {/* Trailer Button */}
                {game.trailer_url && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      size="lg"
                      className="bg-black/50 hover:bg-black/70 text-white border border-white/30"
                      onClick={() => window.open(game.trailer_url, '_blank')}
                    >
                      <Play size={20} className="mr-2" />
                      Assistir Trailer
                    </Button>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {game.title}
                  </h1>
                  
                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 text-white/90">
                    {game.release_date && (
                      <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {new Date(game.release_date).getFullYear()}
                      </span>
                    )}
                    
                    {game.genres && game.genres.length > 0 && (
                      <span>{game.genres[0].name}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
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
                      <Badge key={genre.slug} className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Summary */}
                {game.summary && (
                  <div className="prose dark:prose-invert max-w-none mb-6">
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                      {game.summary}
                    </p>
                  </div>
                )}

                {/* Game Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Release Date */}
                  {game.release_date && (
                    <div className="flex items-center">
                      <Calendar size={20} className="mr-3 text-gray-500" />
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
                      <Building2 size={20} className="mr-3 text-gray-500 mt-1" />
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
                      <Users size={20} className="mr-3 text-gray-500 mt-1" />
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

            {/* Screenshots */}
            {game.screenshots && game.screenshots.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Screenshots
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {game.screenshots.map((screenshot, index) => (
                    <img 
                      key={index}
                      src={screenshot}
                      alt={`Screenshot ${index + 1} de ${game.title}`}
                      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => window.open(screenshot, '_blank')}
                    />
                  ))}
                </div>
              </div>
            )}

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
