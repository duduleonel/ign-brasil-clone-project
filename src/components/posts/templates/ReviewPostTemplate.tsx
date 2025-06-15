
import React from 'react';
import type { Post } from '@/types/database';
import ReviewHeader from './review/ReviewHeader';
import ReviewSidebar from './review/ReviewSidebar';
import ReviewContent from './review/ReviewContent';
import ReviewScoring from './review/ReviewScoring';

interface ReviewPostTemplateProps {
  post: Post;
}

const ReviewPostTemplate: React.FC<ReviewPostTemplateProps> = ({ post }) => {
  const gameRating = post.game?.rating || 4.2;

  return (
    <div className="max-w-6xl mx-auto">
      <ReviewHeader post={post} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <ReviewSidebar post={post} gameRating={gameRating} />
        <ReviewContent post={post} />
      </div>

      <ReviewScoring post={post} gameRating={gameRating} />
    </div>
  );
};

export default ReviewPostTemplate;
