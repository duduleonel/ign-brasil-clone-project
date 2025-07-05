
import React from 'react';
import { Star, Gamepad2, Award } from 'lucide-react';
import PostHeader from '../../shared/PostHeader';
import type { Post } from '@/types/database';

interface ReviewHeaderProps {
  post: Post;
  overallScore: number;
  pros: string[];
  cons: string[];
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({ post, overallScore, pros, cons }) => {
  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-500';
    if (score >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 4) return 'bg-green-100 border-green-500';
    if (score >= 3) return 'bg-yellow-100 border-yellow-500';
    return 'bg-red-100 border-red-500';
  };

  return (
    <div className="mb-12">
      {/* Review score banner */}
      <div className={`p-6 rounded-lg border-2 mb-8 ${getScoreBg(overallScore)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Award size={32} className={getScoreColor(overallScore)} />
            <div className="ml-4">
              <h3 className="text-lg font-bold text-gray-900">Pontuação Final</h3>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={`${i < Math.floor(overallScore) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className={`ml-2 text-2xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore.toFixed(1)}/5
                </span>
              </div>
            </div>
          </div>
          
          {post.game && (
            <div className="text-right">
              <div className="flex items-center text-gray-600 mb-1">
                <Gamepad2 size={16} className="mr-1" />
                <span className="text-sm">Jogo Analisado</span>
              </div>
              <p className="font-semibold">{post.game.title}</p>
            </div>
          )}
        </div>
      </div>

      {/* Standard post header */}
      <PostHeader post={post} layout="default" />
    </div>
  );
};

export default ReviewHeader;
