
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryPosts from '@/components/CategoryPosts';

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const getCategoryName = (slug: string | undefined): string => {
    const categoryMap: { [key: string]: string } = {
      'noticias': 'Notícias',
      'reportagens': 'Reportagens', 
      'entrevistas': 'Entrevistas',
      'reviews': 'Reviews',
      'tutoriais': 'Tutoriais',
      'downloads': 'Downloads',
      'mugen': 'Mugen',
      'ikemen-go': 'Ikemen GO',
      'openbor': 'OpenBOR'
    };
    
    return categoryMap[slug || ''] || 'Categoria';
  };

  if (!slug) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Categoria não encontrada
            </h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {getCategoryName(slug)}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Explore o melhor conteúdo de {getCategoryName(slug).toLowerCase()}
          </p>
        </div>

        <CategoryPosts 
          categorySlug={slug} 
          categoryName={getCategoryName(slug)}
          limit={20}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Category;
