
import React from 'react';
import { AlertCircle, Zap, Clock } from 'lucide-react';
import PostHeader from '../../shared/PostHeader';
import type { Post } from '@/types/database';

interface NewsHeaderProps {
  post: Post;
  isBreaking?: boolean;
  isUrgent?: boolean;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ post, isBreaking = false, isUrgent = false }) => {
  const isRecent = () => {
    const postDate = new Date(post.created_at);
    const now = new Date();
    const diffHours = (now.getTime() - postDate.getTime()) / (1000 * 3600);
    return diffHours < 24;
  };

  return (
    <div className="mb-12">
      {/* Breaking news banner */}
      {(isBreaking || isUrgent || isRecent()) && (
        <div className="bg-red-600 text-white p-4 rounded-lg mb-8 animate-pulse">
          <div className="flex items-center justify-center">
            {isUrgent && <AlertCircle size={20} className="mr-2" />}
            {isRecent() && <Zap size={20} className="mr-2" />}
            <span className="font-bold text-lg">
              {isUrgent ? 'NOTÍCIA URGENTE' : isRecent() ? 'ÚLTIMA HORA' : 'BREAKING NEWS'}
            </span>
          </div>
        </div>
      )}

      {/* Standard post header */}
      <PostHeader post={post} layout="default" />
      
      {/* News metadata */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
        <div className="flex items-center text-blue-700 dark:text-blue-300">
          <Clock size={16} className="mr-2" />
          <span className="text-sm font-medium">
            Publicado em {new Date(post.created_at).toLocaleString('pt-BR')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsHeader;
