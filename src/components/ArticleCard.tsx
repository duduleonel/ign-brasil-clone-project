
import React from 'react';
import { Clock, Eye, Gamepad2 } from 'lucide-react';
import type { Post, Tag } from '@/types/database';
import { useNavigate } from 'react-router-dom';

interface ArticleCardProps {
  post: Post;
  isLarge?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ post, isLarge = false }) => {
  const navigate = useNavigate();
  
  const categoryColors: { [key: string]: string } = {
    'noticias': 'bg-blue-600',
    'reportagens': 'bg-purple-600',
    'entrevistas': 'bg-green-600',
    'reviews': 'bg-orange-600',
    'tutoriais': 'bg-yellow-600',
    'downloads': 'bg-red-600',
    'mugen': 'bg-indigo-600',
    'ikemen-go': 'bg-pink-600',
    'openbor': 'bg-teal-600'
  };

  const categoryColor = post.category?.slug ? categoryColors[post.category.slug] || 'bg-gray-600' : 'bg-gray-600';

  return (
    <article className={`bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700 ${isLarge ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
      {/* Jogo relacionado - exibido no topo se existir */}
      {post.game && (
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-3">
          <div 
            className="flex items-center text-white hover:bg-white/10 rounded-lg p-2 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/jogos/${post.game?.slug}`);
            }}
          >
            <Gamepad2 size={16} className="mr-2" />
            <span className="text-sm font-medium">Relacionado: {post.game.title}</span>
          </div>
        </div>
      )}

      <div className="relative">
        <img 
          src={post.featured_image ? `https://images.unsplash.com/${post.featured_image}` : 'https://images.unsplash.com/photo-1542751371-adc38448a05e'}
          alt={post.title}
          className={`w-full object-cover ${isLarge ? 'h-64 lg:h-80' : 'h-48'}`}
        />
        <div className="absolute top-4 left-4">
          <span className={`${categoryColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
            {post.category?.name || 'Geral'}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className={`text-gray-900 dark:text-white font-bold mb-3 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors ${isLarge ? 'text-2xl' : 'text-lg'}`}>
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {post.excerpt || 'Clique para ler mais...'}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Clock size={14} className="mr-1" />
              {post.read_time} min
            </span>
            <span className="flex items-center">
              <Eye size={14} className="mr-1" />
              {post.view_count}
            </span>
            <span>Por {post.author}</span>
          </div>
          <span className="text-orange-600 dark:text-orange-400">Ler mais →</span>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag: Tag) => (
              <span 
                key={tag.slug}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default ArticleCard;
