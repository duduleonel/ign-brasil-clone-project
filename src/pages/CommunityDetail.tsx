
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Globe, Facebook, Twitter, Youtube, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { useCommunity } from '@/hooks/useCommunities';

const CommunityDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: community, isLoading, error } = useCommunity(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !community) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Comunidade não encontrada
            </h1>
            <button
              onClick={() => navigate('/comunidades')}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Voltar para comunidades
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const socialLinks = [
    { url: community.website_url, icon: Globe, label: 'Website' },
    { url: community.facebook_url, icon: Facebook, label: 'Facebook' },
    { url: community.twitter_url, icon: Twitter, label: 'Twitter' },
    { url: community.youtube_url, icon: Youtube, label: 'YouTube' },
    { url: community.discord_url, icon: MessageCircle, label: 'Discord' },
  ].filter(link => link.url);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate('/comunidades')}
          className="flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-500 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar para comunidades
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="lg:col-span-2">
            {/* Header da comunidade */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8 mb-6 shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700 text-center">
              <img
                src={community.logo_url}
                alt={community.name}
                className="h-32 w-auto mx-auto mb-4 object-contain"
              />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {community.name}
              </h1>
              {community.summary && (
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {community.summary}
                </p>
              )}
            </div>

            {/* Galeria de imagens */}
            {community.images && community.images.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 mb-6 shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Galeria</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {community.images.map((image) => (
                    <img
                      key={image.id}
                      src={image.image_url}
                      alt={image.alt_text || community.name}
                      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar com links sociais */}
          <div className="space-y-6">
            {socialLinks.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Redes Sociais</h3>
                <div className="space-y-3">
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <IconComponent size={20} className="mr-3 text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-400" />
                        <span className="text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 font-medium">
                          {link.label}
                        </span>
                        <ExternalLink size={16} className="ml-auto text-gray-400" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityDetail;
