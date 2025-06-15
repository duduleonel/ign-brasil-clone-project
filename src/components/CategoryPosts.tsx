
import React from 'react';
import { usePosts } from '@/hooks/usePosts';
import PostCardFactory from './posts/PostCardFactory';
import { Skeleton } from './ui/skeleton';

interface CategoryPostsProps {
  categorySlug: string;
  categoryName: string;
  limit?: number;
}

const CategoryPosts: React.FC<CategoryPostsProps> = ({ categorySlug, categoryName, limit = 20 }) => {
  const { data: posts, isLoading, error } = usePosts(limit, categorySlug);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.error(`Error loading posts for category ${categorySlug}:`, error);
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
            Erro ao carregar posts
          </h3>
          <p className="text-red-600 dark:text-red-300">
            Não foi possível carregar os posts desta categoria. Tente novamente mais tarde.
          </p>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Nenhum post encontrado
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Esta categoria ainda não possui posts publicados. Volte em breve para ver o novo conteúdo!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? 'post encontrado' : 'posts encontrados'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCardFactory key={post.id} post={post} />
        ))}
      </div>

      {posts.length >= limit && (
        <div className="text-center pt-8">
          <p className="text-gray-600 dark:text-gray-400">
            Mostrando os primeiros {limit} posts. Mais conteúdo será carregado em breve.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPosts;
