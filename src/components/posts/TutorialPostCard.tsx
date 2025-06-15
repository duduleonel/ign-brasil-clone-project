
import React from 'react';
import { Calendar, User, Clock, Eye, BookOpen, BarChart3 } from 'lucide-react';
import type { Post } from '@/types/database';
import FavoriteButton from '../FavoriteButton';
import { useNavigate } from 'react-router-dom';

interface TutorialPostCardProps {
  post: Post;
  isLarge?: boolean;
  difficulty?: 'Iniciante' | 'Intermediário' | 'Avançado';
}

const TutorialPostCard: React.FC<TutorialPostCardProps> = ({ post, isLarge = false, difficulty = 'Intermediário' }) => {
  const navigate = useNavigate();

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-500';
      case 'Intermediário': return 'bg-yellow-500';
      case 'Avançado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleClick = () => {
    navigate(`/posts/${post.slug}`);
  };

  return (
    <article 
      className={`bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700 cursor-pointer ${isLarge ? 'md:col-span-2 lg:col-span-2' : ''}`}
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={post.featured_image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'}
          alt={post.title}
          className={`w-full object-cover ${isLarge ? 'h-64' : 'h-48'}`}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Tutorial
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <FavoriteButton itemId={post.id} itemType="post" />
        </div>
        <div className={`absolute bottom-3 right-3 ${getDifficultyColor(difficulty)} text-white rounded-lg px-3 py-2 text-sm font-bold`}>
          {difficulty}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className={`text-gray-900 dark:text-white font-bold mb-3 line-clamp-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors ${isLarge ? 'text-2xl' : 'text-lg'}`}>
          {post.title}
        </h3>
        
        <div className="flex items-center gap-4 mb-3 text-sm">
          <div className="flex items-center text-yellow-600 dark:text-yellow-400">
            <BarChart3 size={14} className="mr-1" />
            <span>{difficulty}</span>
          </div>
          <div className="flex items-center text-blue-600 dark:text-blue-400">
            <BookOpen size={14} className="mr-1" />
            <span>Passo a passo</span>
          </div>
        </div>

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

export default TutorialPostCard;
