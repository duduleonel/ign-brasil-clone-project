
import React from 'react';
import { Calendar, User, Clock, Eye, Share2, Heart, MessageCircle, Bookmark } from 'lucide-react';
import type { Post } from '@/types/database';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PostHeaderProps {
  post: Post;
  layout?: 'default' | 'overlay' | 'centered';
  showLiveUpdate?: boolean;
}

const PostHeader: React.FC<PostHeaderProps> = ({ 
  post, 
  layout = 'default',
  showLiveUpdate = false
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (categorySlug?: string) => {
    switch (categorySlug) {
      case 'reviews': return 'bg-green-500';
      case 'noticias': return 'bg-blue-500';
      case 'tutoriais': return 'bg-yellow-500';
      case 'entrevistas': return 'bg-purple-500';
      case 'reportagens': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (layout === 'centered') {
    return (
      <div className="text-center mb-12">
        {/* Category Badge */}
        {post.category && (
          <div className="mb-6">
            <Badge 
              className={`${getCategoryColor(post.category.slug)} text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider`}
            >
              {post.category.name}
            </Badge>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Subtitle/Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            {post.excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <div className="flex items-center">
            <User size={16} className="mr-2" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Por {post.author_name}
            </span>
          </div>
          
          <div className="flex items-center">
            <Calendar size={16} className="mr-2" />
            <span>{formatDate(post.created_at)}</span>
          </div>

          <div className="flex items-center">
            <Clock size={16} className="mr-2" />
            <span>5 min de leitura</span>
          </div>

          <div className="flex items-center">
            <Eye size={16} className="mr-2" />
            <span>{post.view_count} visualizações</span>
          </div>
        </div>

        {/* Social Actions */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Heart size={16} />
            <span>{post.like_count}</span>
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <MessageCircle size={16} />
            <span>Comentar</span>
          </Button>
          
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 size={16} />
            <span>Compartilhar</span>
          </Button>
          
          <Button variant="outline" size="sm">
            <Bookmark size={16} />
          </Button>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={post.featured_image}
              alt={post.title}
              className="w-full h-96 lg:h-[500px] object-cover"
            />
            {showLiveUpdate && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-500 text-white animate-pulse">
                  Ao Vivo
                </Badge>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Default layout
  return (
    <header className="mb-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span>Início</span>
        <span className="mx-2">/</span>
        {post.category && (
          <>
            <span>{post.category.name}</span>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-gray-700 dark:text-gray-300">{post.title}</span>
      </div>

      {/* Category Badge */}
      {post.category && (
        <div className="mb-4">
          <Badge 
            className={`${getCategoryColor(post.category.slug)} text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider`}
          >
            {post.category.name}
          </Badge>
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
        {post.title}
      </h1>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <div className="flex items-center">
          <User size={16} className="mr-2" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {post.author_name}
          </span>
        </div>
        
        <div className="flex items-center">
          <Calendar size={16} className="mr-2" />
          <span>{formatDate(post.created_at)}</span>
        </div>

        <div className="flex items-center">
          <Clock size={16} className="mr-2" />
          <span>5 min</span>
        </div>

        <div className="flex items-center">
          <Eye size={16} className="mr-2" />
          <span>{post.view_count}</span>
        </div>
      </div>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="relative rounded-xl overflow-hidden mb-6">
          <img 
            src={post.featured_image}
            alt={post.title}
            className="w-full h-64 lg:h-80 object-cover"
          />
        </div>
      )}
    </header>
  );
};

export default PostHeader;
