
import React from 'react';
import { usePosts } from '@/hooks/usePosts';
import PostCardFactory from '../PostCardFactory';
import { Skeleton } from '@/components/ui/skeleton';
import type { Post } from '@/types/database';

interface RelatedPostsProps {
  currentPost: Post;
  limit?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost, limit = 3 }) => {
  const { data: posts, isLoading } = usePosts(10, currentPost.category?.slug);

  if (isLoading) {
    return (
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold mb-6">Posts Relacionados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

  // Filter out current post and limit results
  const relatedPosts = posts
    ?.filter(post => post.id !== currentPost.id)
    .slice(0, limit) || [];

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Posts Relacionados
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <PostCardFactory key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
