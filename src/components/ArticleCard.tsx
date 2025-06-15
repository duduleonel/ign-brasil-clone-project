
import React from 'react';
import { Calendar, User, Clock, Eye } from 'lucide-react';
import type { Post } from '@/types/database';
import FavoriteButton from './FavoriteButton';

interface ArticleCardProps {
  post: Post;
  isLarge?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post, isLarge = false }) => {
  const categoryColors: { [key: string]: string } = {
    'noticias': 'bg-blue-600',
    'reportagens': 'bg-purple-600',
    'entrevistas': 'bg-green-600',
    'reviews': 'bg-green-600',
    'tutoriais': 'bg-yellow-600',
    'downloads': 'bg-red-600',
    'mugen': 'bg-indigo-600',
    'ikemen-go': 'bg-pink-600',
    'openbor': 'bg-teal-600'
  };

  const categoryColor = post.category?.slug ? categoryColors[post.category.slug] || 'bg-gray-600' : 'bg-gray-600';

  return (
    <article className={`bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700 ${isLarge ? 'md:col-span-2 lg:col-span-2' : ''}`}>
      <div className="relative">
        <img 
          src={post.featured_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e'}
          alt={post.title}
          className={`w-full object-cover ${isLarge ? 'h-64' : 'h-48'}`}
        />
        <div className="absolute top-3 left-3">
          <span className={`${categoryColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
            {post.category?.name || 'Geral'}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <FavoriteButton itemId={post.id} itemType="post" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className={`text-gray-900 dark:text-white font-bold mb-3 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors ${isLarge ? 'text-2xl' : 'text-lg'}`}>
          {post.title}
        </h3>
        
        {post.excerpt && (
          <p className={`text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 ${isLarge ? 'text-base' : 'text-sm'}`}>
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <User size={14} className="mr-1" />
              {post.author}
            </span>
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(post.created_at).toLocaleDateString('pt-BR')}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Clock size={14} className="mr-1" />
              {post.read_time}min
            </span>
            <span className="flex items-center">
              <Eye size={14} className="mr-1" />
              {post.view_count}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
