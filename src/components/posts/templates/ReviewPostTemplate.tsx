
import React from 'react';
import { Star, ThumbsUp, ThumbsDown, Gamepad2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReviewPostTemplateProps {
  post: Post;
}

const ReviewPostTemplate: React.FC<ReviewPostTemplateProps> = ({ post }) => {
  const navigate = useNavigate();
  const gameRating = post.game?.rating || 4.2;

  const pros = [
    "Gráficos impressionantes",
    "Jogabilidade fluida",
    "História envolvente",
    "Trilha sonora excelente"
  ];

  const cons = [
    "Alguns bugs menores",
    "Curva de dificuldade alta"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-green-600 dark:text-green-400 hover:text-green-500 transition-colors mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </button>

      {/* Hero Section */}
      <div className="relative mb-8">
        <img 
          src={post.featured_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e'}
          alt={post.title}
          className="w-full h-80 object-cover rounded-lg"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold">
            Review
          </span>
        </div>
        <div className="absolute bottom-4 right-4 bg-black/80 text-white rounded-lg p-4">
          <div className="text-3xl font-bold text-green-400">
            {gameRating.toFixed(1)}/5
          </div>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={20} 
                className={`${i < Math.floor(gameRating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Game Info */}
      {post.game && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gamepad2 className="mr-2" />
              Sobre o Jogo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-xl mb-2">{post.game.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {post.game.summary}
                </p>
              </div>
              {post.game.featured_image && (
                <img 
                  src={post.game.featured_image}
                  alt={post.game.title}
                  className="rounded-lg"
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review Content */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          {post.excerpt && (
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 italic">
              {post.excerpt}
            </p>
          )}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <ThumbsUp className="mr-2" />
              Pontos Positivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  {pro}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <ThumbsDown className="mr-2" />
              Pontos Negativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {cons.map((con, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  {con}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Final Rating */}
      <Card>
        <CardHeader>
          <CardTitle>Nota Final</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {gameRating.toFixed(1)}/5.0
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={24} 
                    className={`${i < Math.floor(gameRating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                  />
                ))}
              </div>
            </div>
            <div className="text-lg">
              <span className="font-semibold">Excelente</span>
              <p className="text-gray-600 dark:text-gray-400">
                Altamente recomendado
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewPostTemplate;
