
import React from 'react';
import { Calendar, User, Tag, Share2 } from 'lucide-react';
import SocialShare from '../../shared/SocialShare';
import type { Post } from '@/types/database';

interface NewsFooterProps {
  post: Post;
}

const NewsFooter: React.FC<NewsFooterProps> = ({ post }) => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      {/* Article metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Informações do Artigo</h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <User size={14} className="mr-2" />
              <span>Por: <strong>{post.author_name || 'Redação'}</strong></span>
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="mr-2" />
              <span>Publicado em: {new Date(post.created_at).toLocaleString('pt-BR')}</span>
            </div>
            {post.updated_at !== post.created_at && (
              <div className="flex items-center">
                <Calendar size={14} className="mr-2" />
                <span>Atualizado em: {new Date(post.updated_at).toLocaleString('pt-BR')}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <Share2 size={16} className="mr-2" />
            Compartilhar
          </h3>
          <SocialShare title={post.title} text={post.excerpt} />
        </div>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
            <Tag size={16} className="mr-2" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag.slug}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full font-medium"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFooter;
