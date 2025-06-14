
import React from 'react';
import { usePosts } from '@/hooks/usePosts';
import ArticleCard from './ArticleCard';
import { Skeleton } from './ui/skeleton';

interface RelatedPostsProps {
  gameId: string;
  gameTitle: string;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ gameId, gameTitle }) => {
  const { data: relatedPosts, isLoading } = usePosts(undefined, undefined, gameId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Posts relacionados a {gameTitle}
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

  if (!relatedPosts || relatedPosts.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Posts relacionados a {gameTitle}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Ainda não há posts relacionados a este jogo.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Posts relacionados a {gameTitle}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
