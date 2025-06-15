
import React from 'react';
import { Star, ThumbsUp, ThumbsDown, Gamepad2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PostHeader from '../shared/PostHeader';
import TableOfContents from '../shared/TableOfContents';
import DropCap from '../shared/DropCap';
import SocialShare from '../shared/SocialShare';
import ImageGallery from '../shared/ImageGallery';
import RelatedGameBanner from '../shared/RelatedGameBanner';
import { Message, TabsShortcode, TableShortcode } from '../shared/Shortcodes';
import RelatedPosts from '../shared/RelatedPosts';
import PostSource from '../shared/PostSource';
import SocialLogin from '../shared/SocialLogin';

interface ReviewPostTemplateProps {
  post: Post;
}

const ReviewPostTemplate: React.FC<ReviewPostTemplateProps> = ({ post }) => {
  const navigate = useNavigate();
  const gameRating = post.game?.rating || 4.2;

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
          
          {/* Quick Score */}
          <Card className="mt-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {gameRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={`${i < Math.floor(gameRating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                  />
                ))}
              </div>
              <p className="text-sm font-medium">Altamente Recomendado</p>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <SocialShare 
              title={post.title}
              text={`Review: ${post.title} - Nota ${gameRating.toFixed(1)}/5`}
            />
          </div>
        </div>

        {/* Main Content */}
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
        </div>
      </div>
    </div>
  );
};

export default ReviewPostTemplate;
