
import React from 'react';
import { Clock } from 'lucide-react';
import type { Post } from '@/types/database';

interface NewsTimelineProps {
  post: Post;
  isBreakingNews: boolean;
}

const NewsTimeline: React.FC<NewsTimelineProps> = ({ post, isBreakingNews }) => {
  return (
    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 className="font-bold mb-4 flex items-center">
        <Clock size={20} className="mr-2" />
        Timeline de Atualizações
      </h3>
      <div className="space-y-3">
        <div className="flex">
          <div className="w-20 text-sm text-gray-600 dark:text-gray-400 font-mono">
            {new Date(post.created_at).toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div className="flex-1 text-sm">
            Notícia publicada pela primeira vez
          </div>
        </div>
        {isBreakingNews && (
          <>
            <div className="flex">
              <div className="w-20 text-sm text-gray-600 dark:text-gray-400 font-mono">
                {new Date(Date.now() - 30 * 60 * 1000).toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
              <div className="flex-1 text-sm">
                Adicionadas declarações oficiais
              </div>
            </div>
            <div className="flex">
              <div className="w-20 text-sm text-blue-600 dark:text-blue-400 font-mono font-semibold">
                {new Date().toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
              <div className="flex-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                Última atualização
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsTimeline;
