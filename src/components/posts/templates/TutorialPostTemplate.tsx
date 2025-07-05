
import React, { useState } from 'react';
import { CheckCircle, Circle, BookOpen, BarChart3, Clock, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostHeader from '../shared/PostHeader';
import PostContent from '../shared/PostContent';
import PostSource from '../shared/PostSource';
import SocialShare from '../shared/SocialShare';
import RelatedPosts from '../shared/RelatedPosts';
import TableOfContents from '../shared/TableOfContents';
import type { Post } from '@/types/database';

interface TutorialPostTemplateProps {
  post: Post;
}

const TutorialPostTemplate: React.FC<TutorialPostTemplateProps> = ({ post }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // Mock tutorial steps - in a real app, this would come from the post content
  const tutorialSteps = [
    'Preparar o ambiente de desenvolvimento',
    'Baixar os arquivos necessários',
    'Configurar as ferramentas',
    'Implementar a funcionalidade',
    'Testar o resultado final'
  ];

  const difficulty = 'Intermediário'; // This could come from post metadata
  
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'text-green-600 bg-green-100';
      case 'Intermediário': return 'text-yellow-600 bg-yellow-100';
      case 'Avançado': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex) 
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const progress = (completedSteps.length / tutorialSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Tutorial Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-lg mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <BookOpen size={24} className="mr-3" />
                  <span className="text-xl font-bold">Tutorial Passo a Passo</span>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-bold ${getDifficultyColor(difficulty)}`}>
                  <BarChart3 size={16} className="inline mr-1" />
                  {difficulty}
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
              {post.excerpt && (
                <p className="text-yellow-100 text-lg mb-4">{post.excerpt}</p>
              )}
              
              {/* Progress Bar */}
              <div className="bg-white/20 rounded-full h-3 mb-2">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-yellow-100 text-sm">
                Progresso: {completedSteps.length}/{tutorialSteps.length} passos concluídos
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-8 space-y-6">
                {/* Tutorial Steps Checklist */}
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                  <h3 className="font-bold mb-4 flex items-center">
                    <CheckCircle size={20} className="mr-2 text-green-600" />
                    Lista de Passos
                  </h3>
                  <div className="space-y-3">
                    {tutorialSteps.map((step, index) => (
                      <button
                        key={index}
                        className="flex items-start text-left w-full p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => toggleStep(index)}
                      >
                        {completedSteps.includes(index) ? (
                          <CheckCircle size={20} className="text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Circle size={20} className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${completedSteps.includes(index) ? 'line-through text-gray-500' : ''}`}>
                          {step}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <TableOfContents content={post.content || ''} />
                <SocialShare title={post.title} text={post.excerpt} />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <article className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg">
                {/* Tutorial Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-center">
                    <BarChart3 size={24} className="mx-auto mb-2 text-yellow-600" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Dificuldade</p>
                    <p className="text-yellow-600 font-bold">{difficulty}</p>
                  </div>
                  <div className="text-center">
                    <Clock size={24} className="mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Tempo Estimado</p>
                    <p className="text-blue-600 font-bold">30-45 min</p>
                  </div>
                  <div className="text-center">
                    <User size={24} className="mx-auto mb-2 text-green-600" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Autor</p>
                    <p className="text-green-600 font-bold">{post.author_name}</p>
                  </div>
                </div>

                {/* Content */}
                <PostContent content={post.content || ''} />

                {/* Author info */}
                <PostSource 
                  author={post.author_name || 'Redação'}
                  publishedAt={post.created_at}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag.slug}
                          className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-sm rounded-full"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Related Posts */}
              <div className="mt-12">
                <RelatedPosts currentPost={post} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TutorialPostTemplate;
