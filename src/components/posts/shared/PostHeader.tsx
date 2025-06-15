
import React from 'react';
import { Calendar, User, Clock, Eye, Share2, Edit, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Post } from '@/types/database';

interface PostHeaderProps {
  post: Post;
  layout?: 'default' | 'full-width' | 'overlay' | 'split';
  showLiveUpdate?: boolean;
}

const PostHeader: React.FC<PostHeaderProps> = ({ 
  post, 
  layout = 'default',
  showLiveUpdate = false 
}) => {
  const sharePost = () => {
    navigator.share?.({
      title: post.title,
      text: post.excerpt,
      url: window.location.href
    });
  };

  const layoutStyles = {
    'default': 'relative',
    'full-width': 'relative h-[60vh] min-h-[400px]',
    'overlay': 'relative h-[70vh] min-h-[500px]',
    'split': 'grid md:grid-cols-2 gap-8 items-center'
  };

  return (
    <div className={`${layoutStyles[layout]} mb-8`}>
      {layout !== 'split' && post.featured_image && (
        <div className={`${layout === 'default' ? 'h-64 md:h-80' : 'absolute inset-0'} overflow-hidden ${layout === 'default' ? 'rounded-lg' : ''}`}>
          <img 
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {(layout === 'overlay' || layout === 'full-width') && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          )}
        </div>
      )}

      <div className={`${
        layout === 'overlay' || layout === 'full-width' 
          ? 'absolute bottom-0 left-0 right-0 p-8 text-white' 
          : layout === 'split' 
            ? '' 
            : 'mt-6'
      }`}>
        {layout === 'split' && post.featured_image && (
          <div className="h-64 md:h-80 rounded-lg overflow-hidden">
            <img 
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className={layout === 'split' ? '' : ''}>
          {/* Category and Live Update Badge */}
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {post.category.name}
              </span>
            )}
            {showLiveUpdate && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
                Em Atualização
              </span>
            )}
          </div>

          {/* Title and Subtitle */}
          <h1 className={`font-bold mb-4 ${
            layout === 'overlay' || layout === 'full-width' 
              ? 'text-3xl md:text-5xl text-white' 
              : 'text-3xl md:text-4xl text-gray-900 dark:text-white'
          }`}>
            {post.title}
          </h1>

          {post.excerpt && (
            <p className={`text-xl mb-6 ${
              layout === 'overlay' || layout === 'full-width' 
                ? 'text-gray-200' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {post.excerpt}
            </p>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm mb-6">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              {new Date(post.created_at).toLocaleDateString('pt-BR')}
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              {post.read_time} min de leitura
            </div>
            <div className="flex items-center">
              <Eye size={16} className="mr-2" />
              {post.view_count} visualizações
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button onClick={sharePost} variant="outline" size="sm">
              <Share2 size={16} className="mr-2" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark size={16} className="mr-2" />
              Salvar
            </Button>
            <Button variant="outline" size="sm">
              <Edit size={16} className="mr-2" />
              Sugerir Edição
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
