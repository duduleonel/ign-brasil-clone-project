
import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  title: string;
  score: number;
  platform: string;
  imageUrl: string;
  reviewer: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ title, score, platform, imageUrl, reviewer }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700">
      <div className="relative">
        <img 
          src={`https://images.unsplash.com/${imageUrl}`}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className={`bg-black/80 rounded-lg px-3 py-2 text-2xl font-bold ${getScoreColor(score)}`}>
            {score}/10
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-2 line-clamp-2">{title}</h4>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{platform}</span>
          <span>Por {reviewer}</span>
        </div>
        
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={`${i < Math.floor(score/2) ? 'text-yellow-400 fill-current' : 'text-gray-400 dark:text-gray-600'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
