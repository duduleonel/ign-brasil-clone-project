
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePost } from '@/hooks/usePosts';
import { Skeleton } from '@/components/ui/skeleton';
import ReviewPostTemplate from '@/components/posts/templates/ReviewPostTemplate';
import TutorialPostTemplate from '@/components/posts/templates/TutorialPostTemplate';
import ReportagePostTemplate from '@/components/posts/templates/ReportagePostTemplate';
import NewsPostTemplate from '@/components/posts/templates/NewsPostTemplate';
import InterviewPostTemplate from '@/components/posts/templates/InterviewPostTemplate';
import PostHeader from '@/components/posts/shared/PostHeader';
import TableOfContents from '@/components/posts/shared/TableOfContents';
import DropCap from '@/components/posts/shared/DropCap';
import SocialShare from '@/components/posts/shared/SocialShare';
import RelatedPosts from '@/components/posts/shared/RelatedPosts';
import PostSource from '@/components/posts/shared/PostSource';
import SocialLogin from '@/components/posts/shared/SocialLogin';

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
              onClick={() => window.history.back()}
              className="text-green-600 dark:text-green-400 hover:text-green-500 transition-colors"
            >
              Voltar ao início
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const renderPostTemplate = () => {
    const categorySlug = post.category?.slug;

    switch (categorySlug) {
      case 'reviews':
        return <ReviewPostTemplate post={post} />;
      case 'tutoriais':
        return <TutorialPostTemplate post={post} />;
      case 'reportagens':
        return <ReportagePostTemplate post={post} />;
      case 'noticias':
        return <NewsPostTemplate post={post} />;
      case 'entrevistas':
        return <InterviewPostTemplate post={post} />;
      default:
        // Generic template for other categories
        return (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 order-2 lg:order-1">
                <TableOfContents content={post.content || ''} />
                <div className="mt-6">
                  <SocialShare 
                    title={post.title}
                    text={post.excerpt}
                  />
                </div>
              </div>

              <div className="lg:col-span-3 order-1 lg:order-2">
                <PostHeader post={post} layout="default" />

                <article className="prose prose-lg dark:prose-invert max-w-none">
                  {post.excerpt && (
                    <DropCap>
                      {post.excerpt}
                    </DropCap>
                  )}

                  <div className="whitespace-pre-wrap text-gray-900 dark:text-white leading-relaxed">
                    {post.content}
                  </div>
                </article>

                <PostSource 
                  author={post.author}
                  publishedAt={post.created_at}
                />

                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag.slug}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <SocialLogin />
                <RelatedPosts currentPost={post} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {renderPostTemplate()}
      </main>

      <Footer />
    </div>
  );
};

export default PostDetail;
