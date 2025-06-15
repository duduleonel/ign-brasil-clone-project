
import React from 'react';
import { Calendar, User, Clock, Eye, FileText, Camera, MapPin } from 'lucide-react';
import type { Post } from '@/types/database';
import FavoriteButton from '../FavoriteButton';
import { useNavigate } from 'react-router-dom';

interface ReportagePostCardProps {
  post: Post;
  isLarge?: boolean;
  location?: string;
  isExclusive?: boolean;
}

const ReportagePostCard: React.FC<ReportagePostCardProps> = ({ 
  post, 
  isLarge = false,
  location = "Brasil",
  isExclusive = false
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${post.slug}`);
  };

  const isRecent = () => {
    const postDate = new Date(post.created_at);
    const now = new Date();
    const diffHours = (now.getTime() - postDate.getTime()) / (1000 * 3600);
    return diffHours < 48;
  };

  return (
    <article 
      className={`bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700 cursor-pointer ${isLarge ? 'md:col-span-2 lg:col-span-2' : ''}`}
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={post.featured_image || 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3'}
          alt={post.title}
          className={`w-full object-cover ${isLarge ? 'h-64' : 'h-48'}`}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <FileText size={14} className="mr-1" />
            Reportagem
          </span>
          {isExclusive && (
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
              Exclusiva
            </span>
          )}
          {isRecent() && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Novo
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <FavoriteButton itemId={post.id} itemType="post" />
        </div>
        <div className="absolute bottom-3 left-3 bg-black/80 text-white rounded-lg px-3 py-2 text-sm flex items-center">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className={`text-gray-900 dark:text-white font-bold mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors ${isLarge ? 'text-2xl' : 'text-lg'}`}>
          {post.title}
        </h3>
        
        <div className="flex items-center mb-3 text-sm text-purple-600 dark:text-purple-400">
          <Camera size={14} className="mr-1" />
          <span>Reportagem investigativa</span>
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

export default ReportagePostCard;
