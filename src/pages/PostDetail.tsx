
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Eye, User, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePost } from '@/hooks/usePosts';
import { Skeleton } from '@/components/ui/skeleton';

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = usePost(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-8" />
            <Skeleton className="h-64 w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Post não encontrado
            </h1>
            <button 
              onClick={() => navigate('/')}
              className="text-orange-600 dark:text-orange-400 hover:text-orange-500 transition-colors"
            >
              Voltar ao início
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryColors: { [key: string]: string } = {
    'noticias': 'bg-blue-600',
    'reportagens': 'bg-purple-600',
    'entrevistas': 'bg-green-600',
    'reviews': 'bg-orange-600',
    'tutoriais': 'bg-yellow-600',
    'downloads': 'bg-red-600',
    'mugen': 'bg-indigo-600',
    'ikemen-go': 'bg-pink-600',
    'openbor': 'bg-teal-600'
  };

  const categoryColor = post.category?.slug ? categoryColors[post.category.slug] || 'bg-gray-600' : 'bg-gray-600';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-500 transition-colors mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </button>

          <article className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            {post.featured_image && (
              <div className="relative">
                <img 
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`${categoryColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {post.category?.name || 'Geral'}
                  </span>
                </div>
              </div>
            )}

            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="flex items-center">
                  <User size={16} className="mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {new Date(post.created_at).toLocaleDateString('pt-BR')}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  {post.read_time} min de leitura
                </div>
                <div className="flex items-center">
                  <Eye size={16} className="mr-2" />
                  {post.view_count} visualizações
                </div>
              </div>

              {post.excerpt && (
                <div className="text-xl text-gray-600 dark:text-gray-400 mb-8 italic border-l-4 border-orange-600 pl-6">
                  {post.excerpt}
                </div>
              )}

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-900 dark:text-white leading-relaxed">
                  {post.content}
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag.slug}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostDetail;
