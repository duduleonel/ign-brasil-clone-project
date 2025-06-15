
import React from 'react';
import { Star } from 'lucide-react';
import type { Post } from '@/types/database';
import { Card, CardContent } from '@/components/ui/card';
import TableOfContents from '../../shared/TableOfContents';
import SocialShare from '../../shared/SocialShare';

interface ReviewSidebarProps {
  post: Post;
  gameRating: number;
}

const ReviewSidebar: React.FC<ReviewSidebarProps> = ({ post, gameRating }) => {
  return (
    <div className="lg:col-span-1 order-2 lg:order-1">
      <TableOfContents content={post.content || ''} />
      
      {/* Quick Score */}
      <Card className="mt-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
        <CardContent className="p-6 text-center">
          <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
            {gameRating.toFixed(1)}
          </div>
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={20} 
                className={`${i < Math.floor(gameRating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
              />
            ))}
          </div>
          <p className="text-sm font-medium">Altamente Recomendado</p>
        </CardContent>
      </Card>
      
      <div className="mt-6">
        <SocialShare 
          title={post.title}
          text={`Review: ${post.title} - Nota ${gameRating.toFixed(1)}/5`}
        />
      </div>
    </div>
  );
};

export default ReviewSidebar;
