
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import type { Post } from '@/types/database';
import PostHeader from '../shared/PostHeader';
import TableOfContents from '../shared/TableOfContents';
import DropCap from '../shared/DropCap';
import SocialShare from '../shared/SocialShare';
import RelatedGameBanner from '../shared/RelatedGameBanner';
import { Message, TabsShortcode } from '../shared/Shortcodes';
import RelatedPosts from '../shared/RelatedPosts';
import PostSource from '../shared/PostSource';
import SocialLogin from '../shared/SocialLogin';

interface NewsPostTemplateProps {
  post: Post;
}

const NewsPostTemplate: React.FC<NewsPostTemplateProps> = ({ post }) => {
  const navigate = useNavigate();
  
  const isBreakingNews = Math.random() > 0.7; // Sample logic for breaking news
  
  const newsTabs = [
    {
      label: 'Resumo',
      content: (
        <div>
          <h4 className="font-bold mb-2">Pontos Principais</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Primeiro ponto importante da notícia</li>
            <li>Segundo desenvolvimento relevante</li>
            <li>Impacto esperado no setor</li>
            <li>Próximos passos aguardados</li>
          </ul>
        </div>
      )
    },
    {
      label: 'Contexto',
      content: (
        <div>
          <h4 className="font-bold mb-2">Contexto Histórico</h4>
          <p className="text-sm">Background e eventos que levaram a esta notícia...</p>
        </div>
      )
    },
    {
      label: 'Análise',
      content: (
        <div>
          <h4 className="font-bold mb-2">Análise Editorial</h4>
          <p className="text-sm">Nossa análise sobre o impacto e significado desta notícia...</p>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </button>

      {/* Related Game Banner */}
      {post.game && (
        <RelatedGameBanner game={post.game} />
      )}

      {/* Post Header */}
      <PostHeader 
        post={post} 
        layout="full-width"
        showLiveUpdate={isBreakingNews}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <TableOfContents content={post.content || ''} />
          
          {/* Breaking News Alert */}
          {isBreakingNews && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertCircle size={16} className="text-red-600 mr-2" />
                <span className="font-semibold text-red-600 text-sm">ÚLTIMA HORA</span>
              </div>
              <p className="text-xs text-red-700 dark:text-red-300">
                Esta notícia está sendo atualizada em tempo real conforme novos desenvolvimentos.
              </p>
            </div>
          )}
          
          {/* Trending indicator */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center mb-2">
              <TrendingUp size={16} className="text-blue-600 mr-2" />
              <span className="font-semibold text-blue-600 text-sm">EM ALTA</span>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Esta notícia está entre as mais lidas hoje.
            </p>
          </div>
          
          <div className="mt-6">
            <SocialShare 
              title={post.title}
              text={`Notícia: ${post.title}`}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {/* Drop Cap */}
            {post.excerpt && (
              <DropCap>
                {post.excerpt}
              </DropCap>
            )}

            {/* News Summary Tabs */}
            <TabsShortcode tabs={newsTabs} />

            {/* Verification Notice */}
            <Message type="info">
              Esta notícia foi verificada por nossa equipe editorial e publicada às {new Date(post.created_at).toLocaleTimeString('pt-BR')}.
            </Message>

            {/* Main Content */}
            <div className="whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>

            {/* Update Timeline */}
            <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold mb-4 flex items-center">
                <Clock size={20} className="mr-2" />
                Timeline de Atualizações
              </h3>
              <div className="space-y-3">
                <div className="flex">
                  <div className="w-20 text-sm text-gray-600 dark:text-gray-400 font-mono">
                    {new Date(post.created_at).toLocaleTimeString('pt-BR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <div className="flex-1 text-sm">
                    Notícia publicada pela primeira vez
                  </div>
                </div>
                {isBreakingNews && (
                  <>
                    <div className="flex">
                      <div className="w-20 text-sm text-gray-600 dark:text-gray-400 font-mono">
                        {new Date(Date.now() - 30 * 60 * 1000).toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div className="flex-1 text-sm">
                        Adicionadas declarações oficiais
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-20 text-sm text-blue-600 dark:text-blue-400 font-mono font-semibold">
                        {new Date().toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                      <div className="flex-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                        Última atualização
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Related Context */}
            <Message type="warning">
              Esta é uma notícia em desenvolvimento. Atualizações serão adicionadas conforme novas informações estiverem disponíveis.
            </Message>
          </article>

          {/* Post Source */}
          <PostSource 
            author={post.author}
            publishedAt={post.created_at}
            source="Redação"
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag.slug}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <SocialLogin />

          {/* Related Posts */}
          <RelatedPosts currentPost={post} />
        </div>
      </div>
    </div>
  );
};

export default NewsPostTemplate;
