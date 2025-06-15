
import React from 'react';
import { Calendar, User, Clock, Eye, Zap, AlertCircle } from 'lucide-react';
import type { Post } from '@/types/database';
import FavoriteButton from '../FavoriteButton';
import { useNavigate } from 'react-router-dom';

interface NewsPostCardProps {
  post: Post;
  isLarge?: boolean;
  isUrgent?: boolean;
}

const NewsPostCard: React.FC<NewsPostCardProps> = ({ post, isLarge = false, isUrgent = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${post.slug}`);
  };

  const isRecent = () => {
    const postDate = new Date(post.created_at);
    const now = new Date();
    const diffHours = (now.getTime() - postDate.getTime()) / (1000 * 3600);
    return diffHours < 24;
  };

  return (
    <article 
      className={`bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700 cursor-pointer ${isLarge ? 'md:col-span-2 lg:col-span-2' : ''}`}
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={post.featured_image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
          alt={post.title}
          className={`w-full object-cover ${isLarge ? 'h-64' : 'h-48'}`}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Notícia
          </span>
          {isUrgent && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <AlertCircle size={14} className="mr-1" />
              Urgente
            </span>
          )}
          {isRecent() && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <Zap size={14} className="mr-1" />
              Novo
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <FavoriteButton itemId={post.id} itemType="post" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className={`text-gray-900 dark:text-white font-bold mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${isLarge ? 'text-2xl' : 'text-lg'}`}>
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

export default NewsPostCard;
