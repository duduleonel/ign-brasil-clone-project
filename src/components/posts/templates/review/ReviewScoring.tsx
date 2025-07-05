
import React from 'react';
import { Star, Award, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/types/database';

interface ReviewScoringProps {
  post: Post;
  scores: {
    graphics: number;
    gameplay: number;
    sound: number;
    story: number;
    overall: number;
  };
  pros: string[];
  cons: string[];
}

const ReviewScoring: React.FC<ReviewScoringProps> = ({ post, scores, pros, cons }) => {
  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-500';
    if (score >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={16} 
          className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
      <span className={`ml-2 font-bold ${getScoreColor(rating)}`}>
        {rating.toFixed(1)}
      </span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <Award size={24} className="mr-2 text-green-600" />
            Pontuação Final
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-6xl font-bold text-green-600 mb-2">
            {scores.overall.toFixed(1)}
          </div>
          <div className="flex justify-center mb-2">
            {renderStars(scores.overall)}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Avaliado por {post.author_name || 'Redação'}
          </p>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Pontuação Detalhada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Gráficos</span>
            {renderStars(scores.graphics)}
          </div>
          <div className="flex justify-between items-center">
            <span>Jogabilidade</span>
            {renderStars(scores.gameplay)}
          </div>
          <div className="flex justify-between items-center">
            <span>Som/Música</span>
            {renderStars(scores.sound)}
          </div>
          <div className="flex justify-between items-center">
            <span>História</span>
            {renderStars(scores.story)}
          </div>
        </CardContent>
      </Card>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-600">
              <ThumbsUp size={20} className="mr-2" />
              Pontos Positivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <ThumbsDown size={20} className="mr-2" />
              Pontos Negativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {cons.map((con, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span className="text-sm">{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewScoring;
