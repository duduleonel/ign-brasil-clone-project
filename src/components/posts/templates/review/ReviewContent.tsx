
import React from 'react';
import { Gamepad2 } from 'lucide-react';
import type { Post } from '@/types/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DropCap from '../../shared/DropCap';
import ImageGallery from '../../shared/ImageGallery';
import { Message, TabsShortcode, TableShortcode } from '../../shared/Shortcodes';

interface ReviewContentProps {
  post: Post;
}

const ReviewContent: React.FC<ReviewContentProps> = ({ post }) => {
  // Sample gallery for screenshots
  const screenshotGallery = [
    {
      src: post.featured_image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
      alt: 'Screenshot do jogo',
      caption: 'Gameplay principal'
    },
    // Add more screenshots
  ];

  const reviewTabs = [
    {
      label: 'Gameplay',
      content: (
        <div>
          <h4 className="font-bold mb-2">Mecânicas de Jogo</h4>
          <p>Análise detalhada das mecânicas principais do jogo...</p>
        </div>
      )
    },
    {
      label: 'Gráficos',
      content: (
        <div>
          <h4 className="font-bold mb-2">Qualidade Visual</h4>
          <p>Avaliação dos aspectos visuais e técnicos...</p>
        </div>
      )
    },
    {
      label: 'Áudio',
      content: (
        <div>
          <h4 className="font-bold mb-2">Trilha Sonora e Efeitos</h4>
          <p>Análise da qualidade do áudio e música...</p>
        </div>
      )
    },
    {
      label: 'História',
      content: (
        <div>
          <h4 className="font-bold mb-2">Narrativa e Enredo</h4>
          <p>Avaliação da história e desenvolvimento de personagens...</p>
        </div>
      )
    }
  ];

  const scoreBreakdown = [
    ['Categoria', 'Nota', 'Comentário'],
    ['Gameplay', '9.0', 'Excelente mecânica'],
    ['Gráficos', '8.5', 'Visuais impressionantes'],
    ['Áudio', '9.5', 'Trilha sonora excepcional'],
    ['História', '8.0', 'Narrativa envolvente'],
    ['Rejogabilidade', '7.5', 'Bom valor de replay']
  ];

  return (
    <div className="lg:col-span-3 order-1 lg:order-2">
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
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.game.summary}
                </p>
                
                {/* Game specs would go here */}
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Lançamento:</span> {new Date(post.game.release_date).getFullYear()}</p>
                  <p><span className="font-medium">Gênero:</span> Ação/Aventura</p>
                  <p><span className="font-medium">Plataforma:</span> Multi-plataforma</p>
                </div>
              </div>
              {post.game.featured_image && (
                <img 
                  src={post.game.featured_image}
                  alt={post.game.title}
                  className="rounded-lg w-full h-48 object-cover"
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <article className="prose prose-lg dark:prose-invert max-w-none">
        {/* Drop Cap Introduction */}
        {post.excerpt && (
          <DropCap>
            {post.excerpt}
          </DropCap>
        )}

        <Message type="info">
          Esta análise foi baseada em mais de 20 horas de gameplay na versão para PC.
        </Message>

        {/* Screenshot Gallery */}
        <div className="my-8">
          <h3>Screenshots</h3>
          <ImageGallery images={screenshotGallery} layout="carousel" />
        </div>

        {/* Review Content Tabs */}
        <TabsShortcode tabs={reviewTabs} />

        {/* Main Review Content */}
        <div className="whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>

        {/* Score Breakdown Table */}
        <h3>Análise Detalhada</h3>
        <TableShortcode 
          headers={scoreBreakdown[0]}
          rows={scoreBreakdown.slice(1)}
        />
      </article>
    </div>
  );
};

export default ReviewContent;
