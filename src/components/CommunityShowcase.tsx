
import React from 'react';
import { useCommunities } from '@/hooks/useCommunities';
import { useNavigate } from 'react-router-dom';

const CommunityShowcase = () => {
  const { data: communities } = useCommunities(8);
  const navigate = useNavigate();

  if (!communities || communities.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-700 py-6 mb-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Comunidades Parceiras
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8">
          {communities.map((community) => (
            <button
              key={community.id}
              onClick={() => navigate(`/comunidades/${community.slug}`)}
              className="group p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title={community.name}
            >
              <img
                src={community.logo_url}
                alt={community.name}
                className="h-12 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
            </button>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/comunidades')}
            className="text-orange-600 dark:text-orange-400 hover:text-orange-500 transition-colors font-medium"
          >
            Ver todas as comunidades →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityShowcase;
