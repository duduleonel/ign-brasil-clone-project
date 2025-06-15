
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, MapPin, Clock, Share2 } from 'lucide-react';
import type { Post } from '@/types/database';
import PostHeader from '../shared/PostHeader';
import TableOfContents from '../shared/TableOfContents';
import DropCap from '../shared/DropCap';
import SocialShare from '../shared/SocialShare';
import ImageGallery from '../shared/ImageGallery';
import RelatedGameBanner from '../shared/RelatedGameBanner';
import { Message, Spoiler, ButtonShortcode, TabsShortcode, TableShortcode, AccordionShortcode } from '../shared/Shortcodes';
import RelatedPosts from '../shared/RelatedPosts';
import PostSource from '../shared/PostSource';
import SocialLogin from '../shared/SocialLogin';

interface ReportagePostTemplateProps {
  post: Post;
}

const ReportagePostTemplate: React.FC<ReportagePostTemplateProps> = ({ post }) => {
  const navigate = useNavigate();

  // Sample gallery images (would come from post data)
  const galleryImages = [
    {
      src: post.featured_image || 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3',
      alt: 'Imagem da reportagem',
      caption: 'Local onde a reportagem foi realizada'
    },
    // Add more images as needed
  ];

  // Sample shortcode examples
  const tabsData = [
    {
      label: 'Contexto',
      content: <div>Informações sobre o contexto da reportagem...</div>
    },
    {
      label: 'Evidências',
      content: <div>Documentos e evidências coletadas...</div>
    },
    {
      label: 'Cronologia',
      content: <div>Linha do tempo dos eventos...</div>
    }
  ];

  const accordionData = [
    {
      title: 'Metodologia da Investigação',
      content: <div>Detalhes sobre como a investigação foi conduzida...</div>
    },
    {
      title: 'Fontes Consultadas',
      content: <div>Lista de especialistas e fontes consultadas...</div>
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </button>

      {/* Related Game Banner */}
      {post.game && (
        <RelatedGameBanner game={post.game} />
      )}

      {/* Post Header with different layout options */}
      <PostHeader 
        post={post} 
        layout="overlay" 
        showLiveUpdate={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar with Table of Contents */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <TableOfContents content={post.content || ''} />
          
          {/* Social Share */}
          <div className="mt-6">
            <SocialShare 
              title={post.title}
              text={post.excerpt}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {/* Drop Cap Paragraph */}
            {post.content && (
              <DropCap>
                {post.content.split('\n')[0] || post.excerpt || ''}
              </DropCap>
            )}

            {/* Message Shortcode Examples */}
            <Message type="info">
              Esta reportagem foi produzida com base em entrevistas exclusivas e documentos obtidos através da Lei de Acesso à Informação.
            </Message>

            {/* Image Gallery */}
            {galleryImages.length > 0 && (
              <div className="my-8">
                <h3>Galeria de Imagens</h3>
                <ImageGallery images={galleryImages} layout="grid" />
              </div>
            )}

            {/* Tabs Shortcode */}
            <TabsShortcode tabs={tabsData} />

            {/* Main Content */}
            <div className="whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>

            {/* Spoiler Example */}
            <Spoiler title="Revelação Final da Investigação">
              <p>Conteúdo sensível ou spoilers da investigação...</p>
            </Spoiler>

            {/* Table Example */}
            <TableShortcode 
              headers={['Data', 'Evento', 'Fonte']}
              rows={[
                ['15/06/2025', 'Início da investigação', 'Redação'],
                ['16/06/2025', 'Primeira entrevista', 'Testemunha A'],
                ['17/06/2025', 'Análise de documentos', 'Arquivo público']
              ]}
            />

            {/* Accordion for additional information */}
            <AccordionShortcode items={accordionData} />

            {/* Action Buttons */}
            <div className="flex gap-4 my-8">
              <ButtonShortcode variant="default" href="#contato">
                Entrar em Contato
              </ButtonShortcode>
              <ButtonShortcode variant="outline">
                Compartilhar Informações
              </ButtonShortcode>
            </div>

            {/* Warning Message */}
            <Message type="warning">
              Se você tem informações adicionais sobre este caso, entre em contato conosco através dos canais seguros.
            </Message>
          </article>

          {/* Post Source Information */}
          <PostSource 
            source="Investigação Própria"
            author={post.author}
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
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors cursor-pointer"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Login for Comments */}
          <SocialLogin />

          {/* Related Posts */}
          <RelatedPosts currentPost={post} />
        </div>
      </div>
    </div>
  );
};

export default ReportagePostTemplate;
