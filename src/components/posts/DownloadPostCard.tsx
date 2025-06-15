
import React from 'react';
import { Calendar, User, Clock, Eye, Download, HardDrive, CheckCircle } from 'lucide-react';
import type { Post } from '@/types/database';
import FavoriteButton from '../FavoriteButton';
import { useNavigate } from 'react-router-dom';

interface DownloadPostCardProps {
  post: Post;
  isLarge?: boolean;
  downloadCount?: number;
  fileSize?: string;
  compatibility?: string[];
}

const DownloadPostCard: React.FC<DownloadPostCardProps> = ({ 
  post, 
  isLarge = false, 
  downloadCount = 1234,
  fileSize = '45 MB',
  compatibility = ['Mugen', 'Ikemen GO']
}) => {
  const navigate = useNavigate();

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
          src={post.featured_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e'}
          alt={post.title}
          className={`w-full object-cover ${isLarge ? 'h-64' : 'h-48'}`}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Download
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <FavoriteButton itemId={post.id} itemType="post" />
        </div>
        <div className="absolute bottom-3 right-3 bg-black/80 text-white rounded-lg px-3 py-2 text-sm font-bold flex items-center">
          <Download size={16} className="mr-1" />
          {downloadCount.toLocaleString()}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className={`text-gray-900 dark:text-white font-bold mb-3 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors ${isLarge ? 'text-2xl' : 'text-lg'}`}>
          {post.title}
        </h3>
        
        <div className="flex items-center gap-4 mb-3 text-sm">
          <div className="flex items-center text-blue-600 dark:text-blue-400">
            <HardDrive size={14} className="mr-1" />
            <span>{fileSize}</span>
          </div>
          <div className="flex items-center text-green-600 dark:text-green-400">
            <CheckCircle size={14} className="mr-1" />
            <span>Verificado</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {compatibility.map((platform) => (
            <span 
              key={platform}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
            >
              {platform}
            </span>
          ))}
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

export default DownloadPostCard;
