
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import ReviewCard from '@/components/ReviewCard';
import Sidebar from '@/components/Sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { usePosts } from '@/hooks/usePosts';

const Index = () => {
  const { data: posts, isLoading, error } = usePosts(12);
  const { data: reviewPosts } = usePosts(4, 'reviews');

  if (error) {
    console.error('Error loading posts:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Section */}
            <section className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Bem-vindo ao The Crab Games
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Seu portal definitivo para o universo Mugen, Ikemen GO e OpenBOR
              </p>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-48 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : posts && posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.slice(0, 6).map((post, index) => (
                    <ArticleCard
                      key={post.id}
                      post={post}
                      isLarge={index === 0}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    Nenhum post encontrado. Os posts serão carregados automaticamente.
                  </p>
                </div>
              )}
            </section>

            {/* Reviews Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Reviews em Destaque</h2>
                <a href="#" className="text-orange-600 dark:text-orange-400 hover:text-orange-500 transition-colors">
                  Ver todos →
                </a>
              </div>
              
              {reviewPosts && reviewPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {reviewPosts.map((post) => (
                    <ReviewCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-64 w-full" />
                  ))}
                </div>
              )}
            </section>

            {/* Latest Articles */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Últimas Publicações</h2>
                <a href="#" className="text-orange-600 dark:text-orange-400 hover:text-orange-500 transition-colors">
                  Ver todas →
                </a>
              </div>
              
              {posts && posts.length > 6 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.slice(6).map((post) => (
                    <ArticleCard key={post.id} post={post} />
                  ))}
                </div>
              ) : null}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
