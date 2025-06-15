
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Facebook, Twitter, Youtube, MessageCircle, Instagram, ExternalLink } from 'lucide-react';
import { useCommunity } from '@/hooks/useCommunities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const CommunityDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  if (!slug) {
    navigate('/comunidades');
    return null;
  }

  const { data: community, isLoading, error } = useCommunity(slug);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'website': return <Globe size={20} />;
      case 'facebook': return <Facebook size={20} />;
      case 'twitter': return <Twitter size={20} />;
      case 'youtube': return <Youtube size={20} />;
      case 'discord': return <MessageCircle size={20} />;
      case 'instagram': return <Instagram size={20} />;
      default: return <ExternalLink size={20} />;
    }
  };

  const socialLinks = [
    { platform: 'website', url: community?.website_url, label: 'Website' },
    { platform: 'facebook', url: community?.facebook_url, label: 'Facebook' },
    { platform: 'twitter', url: community?.twitter_url, label: 'Twitter' },
    { platform: 'youtube', url: community?.youtube_url, label: 'YouTube' },
    { platform: 'discord', url: community?.discord_url, label: 'Discord' },
    { platform: 'instagram', url: community?.instagram_url, label: 'Instagram' },
  ].filter(link => link.url);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-96 w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-64 w-full" />
              </div>
              <div>
                <Skeleton className="h-48 w-full" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !community) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
                Comunidade não encontrada
              </h3>
              <p className="text-red-600 dark:text-red-300 mb-4">
                A comunidade que você está procurando não foi encontrada.
              </p>
              <Button onClick={() => navigate('/comunidades')}>
                Voltar para Comunidades
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/comunidades')}
          className="mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Voltar para Comunidades
        </Button>

        {/* Community Header */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative">
            <img 
              src={community.logo_url}
              alt={community.name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {community.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Summary */}
            {community.summary && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Sobre a Comunidade
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                    {community.summary}
                  </p>
                </div>
              </div>
            )}

            {/* Gallery */}
            {community.images && community.images.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Galeria
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {community.images.map((image) => (
                    <img 
                      key={image.id}
                      src={image.image_url}
                      alt={image.alt_text || community.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Conecte-se
                </h3>
                <div className="space-y-3">
                  {socialLinks.map((link) => (
                    <Button
                      key={link.platform}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => window.open(link.url, '_blank')}
                    >
                      {getSocialIcon(link.platform)}
                      <span className="ml-3">{link.label}</span>
                      <ExternalLink size={16} className="ml-auto" />
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Community Info */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Informações
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Criada em</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(community.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                {community.updated_at !== community.created_at && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Última atualização</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(community.updated_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityDetail;
