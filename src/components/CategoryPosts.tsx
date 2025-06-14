
import React from 'react';
import { usePosts } from '@/hooks/usePosts';
import ArticleCard from './ArticleCard';
import { Skeleton } from './ui/skeleton';

interface CategoryPostsProps {
  categorySlug: string;
  categoryName: string;
  limit?: number;
}

const CategoryPosts: React.FC<CategoryPostsProps> = ({ categorySlug, categoryName, limit = 6 }) => {
  const { data: posts, isLoading, error } = usePosts(limit, categorySlug);

  console.log(`Posts for category ${categorySlug}:`, posts);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {categoryName}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
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
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {categoryName}
        </h2>
        <p className="text-red-600 dark:text-red-400">
          Erro ao carregar posts desta categoria.
        </p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {categoryName}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Ainda não há posts nesta categoria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {categoryName} ({posts.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPosts;
