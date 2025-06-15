
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, Quote, User, Calendar } from 'lucide-react';
import type { Post } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PostHeader from '../shared/PostHeader';
import TableOfContents from '../shared/TableOfContents';
import DropCap from '../shared/DropCap';
import SocialShare from '../shared/SocialShare';
import RelatedGameBanner from '../shared/RelatedGameBanner';
import { Message, TabsShortcode, AccordionShortcode } from '../shared/Shortcodes';
import RelatedPosts from '../shared/RelatedPosts';
import PostSource from '../shared/PostSource';
import SocialLogin from '../shared/SocialLogin';

interface InterviewPostTemplateProps {
  post: Post;
}

const InterviewPostTemplate: React.FC<InterviewPostTemplateProps> = ({ post }) => {
  const navigate = useNavigate();
  
  // Sample interview data
  const interviewee = {
    name: "João Silva",
    role: "Game Designer",
    company: "Indie Studios",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    bio: "Game designer com mais de 10 anos de experiência na indústria."
  };

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
    <div className="max-w-6xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-green-600 dark:text-green-400 hover:text-green-500 transition-colors mb-6"
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
        layout="split"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <TableOfContents content={post.content || ''} />
          
          {/* Interviewee Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <User size={16} className="mr-2" />
                Entrevistado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-3">
                <img 
                  src={interviewee.image}
                  alt={interviewee.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-sm">{interviewee.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{interviewee.role}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{interviewee.company}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <SocialShare 
              title={post.title}
              text={`Entrevista: ${post.title}`}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          {/* Interview Info */}
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mic className="mr-2" />
                Detalhes da Entrevista
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={interviewee.image}
                    alt={interviewee.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{interviewee.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{interviewee.role}</p>
                    <p className="text-gray-600 dark:text-gray-400">{interviewee.company}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>Data: {new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center">
                    <Mic size={16} className="mr-2" />
                    <span>Duração: 45 minutos</span>
                  </div>
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    <span>Entrevistador: {post.author}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
      </div>
    </div>
  );
};

export default InterviewPostTemplate;
