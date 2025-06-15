
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Eye, User, Calendar, MapPin, Camera, Share2, BookOpen } from 'lucide-react';
import type { Post } from '@/types/database';

interface ReportagePostTemplateProps {
  post: Post;
}

const ReportagePostTemplate: React.FC<ReportagePostTemplateProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </button>

      {/* Jogo Relacionado - se existir */}
      {post.game && (
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-t-lg p-4 mb-0">
          <div 
            className="flex items-center justify-between bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors cursor-pointer group"
            onClick={() => navigate(`/jogos/${post.game?.slug}`)}
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg">
                <Camera size={24} className="text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium uppercase tracking-wide">
                  Reportagem sobre
                </p>
                <h2 className="text-white text-xl font-bold group-hover:text-purple-100 transition-colors">
                  {post.game.title}
                </h2>
                {post.game.summary && (
                  <p className="text-white/90 text-sm mt-1 line-clamp-1">
                    {post.game.summary}
                  </p>
                )}
              </div>
            </div>
            {post.game.featured_image && (
              <div className="hidden md:block">
                <img 
                  src={post.game.featured_image}
                  alt={post.game.title}
                  className="w-20 h-20 object-cover rounded-lg border-2 border-white/20"
                />
              </div>
            )}
          </div>
        </div>
      )}

      <article className={`bg-white dark:bg-gray-900 overflow-hidden shadow-lg ${post.game ? 'rounded-b-lg' : 'rounded-lg'}`}>
        {post.featured_image && (
          <div className="relative">
            <img 
              src={post.featured_image}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                <Camera size={14} className="mr-1" />
                Reportagem
              </span>
            </div>
            <div className="absolute bottom-4 left-4 bg-black/80 text-white rounded-lg px-3 py-2 flex items-center">
              <MapPin size={14} className="mr-1" />
              <span>Local da reportagem</span>
            </div>
          </div>
        )}

        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
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
            <button className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors">
              <Share2 size={16} className="mr-2" />
              Compartilhar
            </button>
          </div>

          {post.excerpt && (
            <div className="text-xl text-gray-600 dark:text-gray-400 mb-8 italic border-l-4 border-purple-600 pl-6 bg-purple-50 dark:bg-purple-900/20 py-4 rounded-r-lg">
              <BookOpen size={20} className="inline mr-2 text-purple-600" />
              {post.excerpt}
            </div>
          )}

          {/* Conteúdo da reportagem */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-900 dark:text-white leading-relaxed">
              {post.content}
            </div>
          </div>

          {/* Seção de fontes/créditos */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <Camera size={20} className="mr-2" />
              Sobre esta reportagem
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Esta reportagem foi produzida com base em entrevistas exclusivas e pesquisa detalhada sobre o tema. 
              Todas as informações foram verificadas e checadas antes da publicação.
            </p>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag.slug}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default ReportagePostTemplate;
