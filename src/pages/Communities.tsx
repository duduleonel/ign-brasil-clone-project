
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Globe, Facebook, Twitter, Youtube, MessageCircle, Instagram } from 'lucide-react';
import { useCommunities } from '@/hooks/useCommunities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const Communities = () => {
  const navigate = useNavigate();
  const { data: communities, isLoading, error } = useCommunities();

  const handleCommunityClick = (slug: string) => {
    navigate(`/comunidades/${slug}`);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'website': return <Globe size={16} />;
      case 'facebook': return <Facebook size={16} />;
      case 'twitter': return <Twitter size={16} />;
      case 'youtube': return <Youtube size={16} />;
      case 'discord': return <MessageCircle size={16} />;
      case 'instagram': return <Instagram size={16} />;
      default: return <ExternalLink size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Comunidades
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Conecte-se com as melhores comunidades e canais de gaming do Brasil e do mundo.
          </p>
        </div>

        {/* Communities Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
                Erro ao carregar comunidades
              </h3>
              <p className="text-red-600 dark:text-red-300">
                Não foi possível carregar as comunidades. Tente novamente mais tarde.
              </p>
            </div>
          </div>
        ) : !communities || communities.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Nenhuma comunidade encontrada
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                As comunidades serão adicionadas em breve. Volte para conferir!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <div 
                key={community.id}
                className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700"
                onClick={() => handleCommunityClick(community.slug)}
              >
                <div className="relative">
                  <img 
                    src={community.logo_url}
                    alt={community.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {community.name}
                  </h3>
                  
                  {community.summary && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {community.summary}
                    </p>
                  )}

                  {/* Social Links */}
                  <div className="flex flex-wrap gap-2">
                    {community.website_url && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(community.website_url, '_blank');
                        }}
                      >
                        {getSocialIcon('website')}
                      </Button>
                    )}
                    {community.facebook_url && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(community.facebook_url, '_blank');
                        }}
                      >
                        {getSocialIcon('facebook')}
                      </Button>
                    )}
                    {community.twitter_url && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(community.twitter_url, '_blank');
                        }}
                      >
                        {getSocialIcon('twitter')}
                      </Button>
                    )}
                    {community.youtube_url && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(community.youtube_url, '_blank');
                        }}
                      >
                        {getSocialIcon('youtube')}
                      </Button>
                    )}
                    {community.discord_url && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(community.discord_url, '_blank');
                        }}
                      >
                        {getSocialIcon('discord')}
                      </Button>
                    )}
                    {community.instagram_url && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(community.instagram_url, '_blank');
                        }}
                      >
                        {getSocialIcon('instagram')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Communities;
