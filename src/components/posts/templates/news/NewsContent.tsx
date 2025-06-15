
import React from 'react';
import type { Post } from '@/types/database';
import DropCap from '../../shared/DropCap';
import { Message, TabsShortcode } from '../../shared/Shortcodes';

interface NewsContentProps {
  post: Post;
}

const NewsContent: React.FC<NewsContentProps> = ({ post }) => {
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
          Linha do Tempo das Atualizações
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
        </div>
      </div>

      {/* Related Context */}
      <Message type="warning">
        Esta é uma notícia em desenvolvimento. Atualizações serão adicionadas conforme novas informações estiverem disponíveis.
      </Message>
    </article>
  );
};

export default NewsContent;
