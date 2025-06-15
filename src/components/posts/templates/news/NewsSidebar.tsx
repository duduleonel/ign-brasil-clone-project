
import React from 'react';
import { AlertCircle, TrendingUp } from 'lucide-react';
import type { Post } from '@/types/database';
import TableOfContents from '../../shared/TableOfContents';
import SocialShare from '../../shared/SocialShare';

interface NewsSidebarProps {
  post: Post;
  isBreakingNews: boolean;
}

const NewsSidebar: React.FC<NewsSidebarProps> = ({ post, isBreakingNews }) => {
  return (
    <div className="lg:col-span-1 order-2 lg:order-1">
      <TableOfContents content={post.content || ''} />
      
      {/* Breaking News Alert */}
      {isBreakingNews && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertCircle size={16} className="text-red-600 mr-2" />
            <span className="font-semibold text-red-600 text-sm">ÚLTIMA HORA</span>
          </div>
          <p className="text-xs text-red-700 dark:text-red-300">
            Esta notícia está sendo atualizada em tempo real conforme novos desenvolvimentos.
          </p>
        </div>
      )}
      
      {/* Trending indicator */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-center mb-2">
          <TrendingUp size={16} className="text-blue-600 mr-2" />
          <span className="font-semibold text-blue-600 text-sm">EM ALTA</span>
        </div>
        <p className="text-xs text-blue-700 dark:text-blue-300">
          Esta notícia está entre as mais lidas hoje.
        </p>
      </div>
      
      <div className="mt-6">
        <SocialShare 
          title={post.title}
          text={`Notícia: ${post.title}`}
        />
      </div>
    </div>
  );
};

export default NewsSidebar;
