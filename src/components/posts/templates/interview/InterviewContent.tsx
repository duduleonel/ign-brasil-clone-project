
import React from 'react';
import { Quote } from 'lucide-react';
import type { Post } from '@/types/database';
import DropCap from '../../shared/DropCap';
import PostSource from '../../shared/PostSource';
import SocialLogin from '../../shared/SocialLogin';
import RelatedPosts from '../../shared/RelatedPosts';
import { Message, TabsShortcode, AccordionShortcode } from '../../shared/Shortcodes';
import InterviewDetails from './InterviewDetails';

interface InterviewContentProps {
  post: Post;
  interviewee: {
    name: string;
    role: string;
    company: string;
    image: string;
    bio: string;
  };
}

const InterviewContent: React.FC<InterviewContentProps> = ({ post, interviewee }) => {
  const highlights = [
    "A importância da narrativa em jogos indie",
    "Desafios do desenvolvimento solo",
    "O futuro dos jogos no Brasil",
    "Conselhos para novos desenvolvedores"
  ];

  const interviewTabs = [
    {
      label: 'Sobre o Entrevistado',
      content: (
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <img 
              src={interviewee.image}
              alt={interviewee.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold">{interviewee.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{interviewee.role} na {interviewee.company}</p>
              <p className="text-sm mt-2">{interviewee.bio}</p>
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Principais Tópicos',
      content: (
        <div>
          <ul className="space-y-2">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start">
                <Quote size={16} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      label: 'Contexto',
      content: (
        <div>
          <p className="text-sm">Esta entrevista foi realizada durante o evento GameDev Conference 2025, onde discutimos os desafios e oportunidades no desenvolvimento de jogos indie no Brasil.</p>
        </div>
      )
    }
  ];

  const qaItems = [
    {
      title: "Como você começou na indústria de jogos?",
      content: (
        <div>
          <blockquote className="border-l-4 border-green-500 pl-4 italic bg-gray-50 dark:bg-gray-800 p-4 rounded-r-lg">
            "Comecei modificando jogos quando tinha 15 anos. Era fascinado por como pequenas mudanças no código podiam criar experiências completamente diferentes..."
          </blockquote>
        </div>
      )
    },
    {
      title: "Qual foi o maior desafio no desenvolvimento do seu último jogo?",
      content: (
        <div>
          <blockquote className="border-l-4 border-green-500 pl-4 italic bg-gray-50 dark:bg-gray-800 p-4 rounded-r-lg">
            "O maior desafio foi balancear a complexidade técnica com a acessibilidade. Queríamos criar algo inovador, mas que fosse fácil de aprender..."
          </blockquote>
        </div>
      )
    },
    {
      title: "Que conselho você daria para novos desenvolvedores?",
      content: (
        <div>
          <blockquote className="border-l-4 border-green-500 pl-4 italic bg-gray-50 dark:bg-gray-800 p-4 rounded-r-lg">
            "Comecem pequeno e terminem os projetos. É melhor fazer três jogos simples e completos do que abandonar um projeto complexo no meio..."
          </blockquote>
        </div>
      )
    }
  ];

  return (
    <div className="lg:col-span-3 order-1 lg:order-2">
      {/* Interview Info */}
      <InterviewDetails post={post} interviewee={interviewee} />

      {/* Interview Overview Tabs */}
      <TabsShortcode tabs={interviewTabs} />

      <article className="prose prose-lg dark:prose-invert max-w-none">
        {/* Drop Cap Introduction */}
        {post.excerpt && (
          <DropCap>
            {post.excerpt}
          </DropCap>
        )}

        <Message type="info">
          Esta entrevista foi conduzida presencialmente e editada para maior clareza. As opiniões expressas são do entrevistado.
        </Message>

        {/* Main Interview Content */}
        <div className="whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>

        {/* Q&A Section */}
        <h3 className="text-xl font-bold mt-8 mb-4">Perguntas e Respostas</h3>
        <AccordionShortcode items={qaItems} />

        {/* Key Quotes */}
        <div className="my-8 p-6 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg">
          <h4 className="font-bold mb-4 flex items-center">
            <Quote size={20} className="mr-2" />
            Citações Importantes
          </h4>
          <div className="space-y-4">
            <blockquote className="text-lg italic">
              "A criatividade é mais importante que o orçamento. Alguns dos melhores jogos foram feitos com recursos limitados."
            </blockquote>
            <blockquote className="text-lg italic">
              "O mercado brasileiro de jogos está crescendo, mas ainda temos muito potencial inexplorado."
            </blockquote>
          </div>
        </div>

        {/* Final Message */}
        <Message type="success">
          Agradecemos ao {interviewee.name} por compartilhar suas experiências e insights valiosos com nossa comunidade.
        </Message>
      </article>

      {/* Post Source */}
      <PostSource 
        author={post.author}
        publishedAt={post.created_at}
        source="Entrevista Exclusiva"
      />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag.slug}
                className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition-colors cursor-pointer"
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
  );
};

export default InterviewContent;
