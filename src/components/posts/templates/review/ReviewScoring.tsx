
import React from 'react';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import type { Post } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PostSource from '../../shared/PostSource';
import SocialLogin from '../../shared/SocialLogin';
import RelatedPosts from '../../shared/RelatedPosts';

interface ReviewScoringProps {
  post: Post;
  gameRating: number;
}

const ReviewScoring: React.FC<ReviewScoringProps> = ({ post, gameRating }) => {
  const pros = [
    "Gráficos impressionantes e detalhados",
    "Jogabilidade fluida e responsiva",
    "História envolvente com personagens bem desenvolvidos",
    "Trilha sonora excelente e imersiva",
    "Sistema de combate inovador"
  ];

  const cons = [
    "Alguns bugs menores em cutscenes",
    "Curva de dificuldade alta no início",
    "Tempo de carregamento longo em consoles antigos"
  ];

  return (
    <>
      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-6 my-8">
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
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{pro}</span>
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
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Final Rating */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Veredicto Final</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {gameRating.toFixed(1)}/5.0
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={24} 
                    className={`${i < Math.floor(gameRating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                  />
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold mb-2">Excelente</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
                Um jogo que define padrões na indústria e oferece uma experiência memorável
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Post Source */}
      <PostSource 
        author={post.author}
        publishedAt={post.created_at}
        source="Análise Original"
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

      {/* Comments Section */}
      <SocialLogin />

      {/* Related Posts */}
      <RelatedPosts currentPost={post} />
    </>
  );
};

export default ReviewScoring;
