
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
import RelatedGameBanner from '@/components/posts/shared/RelatedGameBanner';
import PostContent from '@/components/posts/shared/PostContent';

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  console.log('[PostDetail] Slug recebido:', slug);
  const { data: post, isLoading, error } = usePost(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
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
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Post não encontrado
            </h1>
            <p className="text-gray-600 text-sm mb-4 break-words">
              Slug pesquisado: <span className="font-mono">{slug}</span>
            </p>
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
        // Modern blog-style template inspired by Foxiz
        return (
          <div className="max-w-4xl mx-auto">
            {/* Related Game Banner */}
            {post.game && (
              <RelatedGameBanner game={post.game} />
            )}

            {/* Centered Post Header */}
            <PostHeader post={post} layout="centered" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
              {/* Sidebar - Table of Contents & Social Share */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="sticky top-8 space-y-6">
                  <TableOfContents content={post.content || ''} />
                  <SocialShare 
                    title={post.title}
                    text={post.excerpt}
                  />
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-9 order-1 lg:order-2">
                <article className="bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-12 shadow-lg">
                  {/* Drop Cap Intro */}
                  {post.excerpt && (
                    <DropCap>
                      {post.excerpt}
                    </DropCap>
                  )}

                  {/* Main Content */}
                  <PostContent content={post.content || ''} />

                  {/* Post Source */}
                  <PostSource 
                    author={post.author_name}
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
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer font-medium"
                          >
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>

                {/* Comments Section */}
                <div className="mt-8">
                  <SocialLogin />
                </div>

                {/* Related Posts */}
                <div className="mt-12">
                  <RelatedPosts currentPost={post} />
                </div>
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
