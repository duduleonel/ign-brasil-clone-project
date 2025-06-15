
import React from 'react';
import type { Post } from '@/types/database';
import PostSource from '../../shared/PostSource';
import SocialLogin from '../../shared/SocialLogin';
import RelatedPosts from '../../shared/RelatedPosts';

interface NewsFooterProps {
  post: Post;
}

const NewsFooter: React.FC<NewsFooterProps> = ({ post }) => {
  return (
    <>
      {/* Post Source */}
      <PostSource 
        author={post.author}
        publishedAt={post.created_at}
        source="Redação"
      />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag.slug}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Comments */}
      <SocialLogin />

      {/* Related Posts */}
      <RelatedPosts currentPost={post} />
    </>
  );
};

export default NewsFooter;
