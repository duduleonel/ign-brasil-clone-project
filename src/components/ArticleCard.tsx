
import React from 'react';
import { Clock, Eye } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  views: string;
  imageUrl: string;
  isLarge?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  title, 
  excerpt, 
  category, 
  readTime, 
  views, 
  imageUrl, 
  isLarge = false 
}) => {
  return (
    <article className={`bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700 ${isLarge ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
      <div className="relative">
        <img 
          src={`https://images.unsplash.com/${imageUrl}`}
          alt={title}
          className={`w-full object-cover ${isLarge ? 'h-64 lg:h-80' : 'h-48'}`}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className={`text-gray-900 dark:text-white font-bold mb-3 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors ${isLarge ? 'text-2xl' : 'text-lg'}`}>
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Clock size={14} className="mr-1" />
              {readTime}
            </span>
            <span className="flex items-center">
              <Eye size={14} className="mr-1" />
              {views}
            </span>
          </div>
          <span className="text-red-600 dark:text-red-400">Ler mais →</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
