
import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Post } from '@/types/database';

interface ReviewCardProps {
  post: Post;
  score?: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ post, score }) => {
  // Use the game's rating if available, otherwise use the provided score or default to 8
  const gameRating = post.game?.rating || score || 8;

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-400';
    if (score >= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Link to={`/post/${post.slug}`}>
      <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <img 
            src={post.featured_image ? `https://images.unsplash.com/${post.featured_image}` : 'https://images.unsplash.com/photo-1542751371-adc38448a05e'}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4">
            <div className={`bg-black/80 rounded-lg px-3 py-2 text-xl font-bold ${getScoreColor(gameRating)}`}>
              {gameRating.toFixed(1)}/5
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-2 line-clamp-2">{post.title}</h4>
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>{post.category?.name || 'Review'}</span>
            <span>Por {post.author}</span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {post.excerpt}
          </p>
          
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={`${i < Math.floor(gameRating) ? 'text-yellow-400 fill-current' : 'text-gray-400 dark:text-gray-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
