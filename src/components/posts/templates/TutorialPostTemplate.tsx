
import React, { useState } from 'react';
import { BookOpen, CheckCircle, Code, Download, ArrowLeft, ChevronRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PostHeader from '../shared/PostHeader';
import TableOfContents from '../shared/TableOfContents';
import DropCap from '../shared/DropCap';
import SocialShare from '../shared/SocialShare';
import ImageGallery from '../shared/ImageGallery';
import { Message, Spoiler, ButtonShortcode, TabsShortcode, AccordionShortcode } from '../shared/Shortcodes';
import RelatedPosts from '../shared/RelatedPosts';
import PostSource from '../shared/PostSource';
import SocialLogin from '../shared/SocialLogin';

interface TutorialPostTemplateProps {
  post: Post;
}

const TutorialPostTemplate: React.FC<TutorialPostTemplateProps> = ({ post }) => {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      id: 1,
      title: "Preparação do ambiente",
      content: "Configure os arquivos necessários e organize a estrutura de pastas.",
      code: `// Exemplo de código
mkdir meu-projeto
cd meu-projeto
npm init -y`,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      id: 2,
      title: "Configuração inicial",
      content: "Instale as dependências e configure os arquivos básicos.",
      code: `// Configuração básica
npm install express
npm install nodemon --save-dev

// package.json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}`,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
    },
    {
      id: 3,
      title: "Implementação",
      content: "Desenvolva a funcionalidade principal seguindo as boas práticas.",
      code: `// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
      image: "https://images.unsplash.com/photo-1551033406-611cf9a28f54"
    }
  ];

  const materials = [
    "Node.js 18+ instalado",
    "Editor de texto (VSCode recomendado)",
    "Conhecimento básico de JavaScript",
    "Terminal/Prompt de comando",
    "Git instalado (opcional)"
  ];

  const tutorialTabs = [
    {
      label: 'Iniciante',
      content: (
        <div>
          <h4 className="font-bold mb-2">Para Iniciantes</h4>
          <p>Este tutorial é perfeito se você está começando. Não é necessário conhecimento prévio.</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Tempo estimado: 2-3 horas</li>
            <li>Dificuldade: Fácil</li>
            <li>Pré-requisitos: Nenhum</li>
          </ul>
        </div>
      )
    },
    {
      label: 'Intermediário',
      content: (
        <div>
          <h4 className="font-bold mb-2">Nível Intermediário</h4>
          <p>Para quem já tem conhecimentos básicos e quer se aprofundar.</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Tempo estimado: 1-2 horas</li>
            <li>Dificuldade: Média</li>
            <li>Pré-requisitos: JavaScript básico</li>
          </ul>
        </div>
      )
    },
    {
      label: 'Avançado',
      content: (
        <div>
          <h4 className="font-bold mb-2">Nível Avançado</h4>
          <p>Para desenvolvedores experientes que querem otimizar e personalizar.</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Tempo estimado: 30-60 minutos</li>
            <li>Dificuldade: Alta</li>
            <li>Pré-requisitos: Node.js avançado</li>
          </ul>
        </div>
      )
    }
  ];

  const troubleshootingItems = [
    {
      title: "Erro: 'npm' não é reconhecido",
      content: (
        <div>
          <p>Este erro indica que o Node.js não está instalado ou não está no PATH.</p>
          <p className="mt-2"><strong>Solução:</strong> Baixe e instale o Node.js do site oficial.</p>
        </div>
      )
    },
    {
      title: "Porta já está em uso",
      content: (
        <div>
          <p>O erro "EADDRINUSE" significa que a porta já está sendo usada.</p>
          <p className="mt-2"><strong>Solução:</strong> Mude a porta ou finalize o processo que está usando a porta.</p>
        </div>
      )
    }
  ];

  const toggleStep = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  // Sample images for the tutorial
  const tutorialImages = steps.map(step => ({
    src: step.image,
    alt: step.title,
    caption: `Passo ${step.id}: ${step.title}`
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-green-600 dark:text-green-400 hover:text-green-500 transition-colors mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </button>

      {/* Post Header */}
      <PostHeader 
        post={post} 
        layout="default"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <TableOfContents content={post.content || ''} />
          
          {/* Progress Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Seu Progresso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {Math.round((completedSteps.length / steps.length) * 100)}%
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                  <div 
                    className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {completedSteps.length} de {steps.length} passos concluídos
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <SocialShare 
              title={post.title}
              text={`Tutorial: ${post.title}`}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          {/* Header with difficulty level */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold">
                Tutorial
              </span>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                Intermediário
              </span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                <Play size={14} className="mr-1" />
                45 min
              </span>
            </div>
          </div>

          {/* Difficulty Level Tabs */}
          <TabsShortcode tabs={tutorialTabs} />

          <article className="prose prose-lg dark:prose-invert max-w-none">
            {/* Drop Cap Introduction */}
            {post.excerpt && (
              <DropCap>
                {post.excerpt}
              </DropCap>
            )}

            <Message type="info">
              Este tutorial foi testado nas versões mais recentes das ferramentas. Verifique se você tem as versões corretas instaladas.
            </Message>

            {/* Materials Needed */}
            <Card className="my-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2" />
                  Materiais Necessários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {materials.map((material, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{material}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tutorial Images */}
            <div className="my-8">
              <h3>Visualização dos Passos</h3>
              <ImageGallery images={tutorialImages} layout="carousel" />
            </div>

            {/* Table of Contents for Steps */}
            <Card className="my-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2" />
                  Índice do Tutorial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {steps.map((step) => (
                    <li key={step.id} className="flex items-center">
                      <span className="font-mono text-sm mr-3 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {step.id}
                      </span>
                      <ChevronRight size={16} className="mr-2 text-gray-400" />
                      <span className="flex-1">{step.title}</span>
                      {completedSteps.includes(step.id) && (
                        <CheckCircle size={16} className="text-green-500" />
                      )}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>
          </article>

          {/* Tutorial Steps */}
          <div className="space-y-8 my-8">
            <h2 className="text-2xl font-bold">Passo a Passo</h2>
            {steps.map((step, index) => (
              <Card key={step.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                        completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-gray-400'
                      }`}>
                        {completedSteps.includes(step.id) ? <CheckCircle size={20} /> : step.id}
                      </div>
                      Passo {step.id}: {step.title}
                    </CardTitle>
                    <Button
                      variant={completedSteps.includes(step.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleStep(step.id)}
                    >
                      {completedSteps.includes(step.id) ? 'Concluído' : 'Marcar como concluído'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{step.content}</p>
                  
                  {step.image && (
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  {step.code && (
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Code size={16} className="text-green-400 mr-2" />
                          <span className="text-green-400 text-sm">Código</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigator.clipboard.writeText(step.code || '')}
                        >
                          Copiar
                        </Button>
                      </div>
                      <pre className="text-gray-300 text-sm overflow-x-auto">
                        <code>{step.code}</code>
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Troubleshooting Section */}
          <div className="my-8">
            <h3 className="text-xl font-bold mb-4">Resolução de Problemas</h3>
            <AccordionShortcode items={troubleshootingItems} />
          </div>

          {/* Advanced Tips */}
          <Spoiler title="Dicas Avançadas e Otimizações">
            <div className="space-y-4">
              <p>Para usuários mais experientes, aqui estão algumas otimizações:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Use middleware de cache para melhor performance</li>
                <li>Implemente rate limiting para segurança</li>
                <li>Configure variáveis de ambiente para diferentes ambientes</li>
                <li>Adicione testes automatizados</li>
              </ul>
            </div>
          </Spoiler>

          {/* Conclusion */}
          <Card className="my-8">
            <CardHeader>
              <CardTitle>🎉 Parabéns!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Você completou o tutorial! Agora você tem os conhecimentos necessários para 
                implementar essa funcionalidade em seus próprios projetos.
              </p>
              <div className="flex gap-4 flex-wrap">
                <ButtonShortcode href="#download">
                  <Download size={16} className="mr-2" />
                  Baixar Projeto Completo
                </ButtonShortcode>
                <ButtonShortcode variant="outline">
                  Ver Próximo Tutorial
                </ButtonShortcode>
                <ButtonShortcode variant="outline">
                  Compartilhar Resultado
                </ButtonShortcode>
              </div>
            </CardContent>
          </Card>

          {/* Post Source */}
          <PostSource 
            author={post.author}
            publishedAt={post.created_at}
            source="Tutorial Original"
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span 
                    key={tag.slug}
                    className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-sm rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors cursor-pointer"
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

export default TutorialPostTemplate;
