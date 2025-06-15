
import React, { useState } from 'react';
import { BookOpen, CheckCircle, Code, Download, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
cd meu-projeto`
    },
    {
      id: 2,
      title: "Configuração inicial",
      content: "Instale as dependências e configure os arquivos básicos.",
      code: `// Configuração básica
npm init -y
npm install requisitos`
    },
    {
      id: 3,
      title: "Implementação",
      content: "Desenvolva a funcionalidade principal seguindo as boas práticas.",
      code: `// Código principal
function exemplo() {
  return "Hello World";
}`
    }
  ];

  const materials = [
    "Mugen 1.1 ou superior",
    "Editor de texto (VSCode recomendado)",
    "Conhecimento básico de programação",
    "Sprites e assets necessários"
  ];

  const toggleStep = (stepId: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-green-600 dark:text-green-400 hover:text-green-500 transition-colors mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <span className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold mr-4">
            Tutorial
          </span>
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
            Intermediário
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.excerpt && (
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {post.excerpt}
          </p>
        )}
      </div>

      {/* Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Progresso do Tutorial</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span>Progresso: {completedSteps.length}/{steps.length}</span>
            <span className="text-2xl">
              {Math.round((completedSteps.length / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Materials Needed */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="mr-2" />
            Materiais Necessários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-3">
            {materials.map((material, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                {material}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Table of Contents */}
      <Card className="mb-8">
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
                <span className="font-mono text-sm mr-3">{step.id}.</span>
                <ChevronRight size={16} className="mr-2 text-gray-400" />
                <span>{step.title}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Tutorial Steps */}
      <div className="space-y-8 mb-8">
        {steps.map((step, index) => (
          <Card key={step.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                    completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    {step.id}
                  </div>
                  {step.title}
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
              {step.code && (
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <div className="flex items-center mb-2">
                    <Code size={16} className="text-green-400 mr-2" />
                    <span className="text-green-400 text-sm">Código</span>
                  </div>
                  <pre className="text-gray-300 text-sm">
                    <code>{step.code}</code>
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conclusion */}
      <Card>
        <CardHeader>
          <CardTitle>Parabéns!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Você completou o tutorial! Agora você tem os conhecimentos necessários para 
            implementar essa funcionalidade em seus próprios projetos.
          </p>
          <div className="flex gap-4">
            <Button>
              Baixar Projeto Completo
            </Button>
            <Button variant="outline">
              Ver Próximo Tutorial
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorialPostTemplate;
