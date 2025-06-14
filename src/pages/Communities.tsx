
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { useCommunities } from '@/hooks/useCommunities';
import { useNavigate } from 'react-router-dom';

const Communities = () => {
  const navigate = useNavigate();
  const { data: communities, isLoading } = useCommunities();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header da página */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Comunidades
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Conheça as comunidades parceiras do universo gaming
          </p>
        </div>

        {/* Grade de comunidades */}
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
        ) : communities && communities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community) => (
              <div
                key={community.id}
                onClick={() => navigate(`/comunidades/${community.slug}`)}
                className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6 text-center">
                  <img
                    src={community.logo_url}
                    alt={community.name}
                    className="h-24 w-auto mx-auto mb-4 object-contain"
                  />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {community.name}
                  </h3>
                  {community.summary && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                      {community.summary}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Nenhuma comunidade encontrada.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Communities;
