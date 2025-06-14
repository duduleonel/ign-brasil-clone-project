
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryPosts from '@/components/CategoryPosts';

const TestCategories = () => {
  const categories = [
    { slug: 'noticias', name: 'Notícias' },
    { slug: 'reportagens', name: 'Reportagens' },
    { slug: 'entrevistas', name: 'Entrevistas' },
    { slug: 'reviews', name: 'Reviews' },
    { slug: 'tutoriais', name: 'Tutoriais' },
    { slug: 'downloads', name: 'Downloads' },
    { slug: 'mugen', name: 'Mugen' },
    { slug: 'ikemen-go', name: 'Ikemen GO' },
    { slug: 'openbor', name: 'OpenBOR' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Teste de Categorias
        </h1>
        
        <div className="space-y-12">
          {categories.map((category) => (
            <CategoryPosts
              key={category.slug}
              categorySlug={category.slug}
              categoryName={category.name}
              limit={3}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TestCategories;
