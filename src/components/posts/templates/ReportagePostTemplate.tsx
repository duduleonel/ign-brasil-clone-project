
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostHeader from '../shared/PostHeader';
import PostContent from '../shared/PostContent';
import PostSource from '../shared/PostSource';
import SocialShare from '../shared/SocialShare';
import RelatedPosts from '../shared/RelatedPosts';
import TableOfContents from '../shared/TableOfContents';
import type { Post } from '@/types/database';

interface ReportagePostTemplateProps {
  post: Post;
}

const ReportagePostTemplate: React.FC<ReportagePostTemplateProps> = ({ post }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Reportage Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-lg mb-8">
              <div className="flex items-center mb-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                  REPORTAGEM ESPECIAL
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
              {post.excerpt && (
                <p className="text-orange-100 text-lg">{post.excerpt}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-8 space-y-6">
                <TableOfContents content={post.content || ''} />
                <SocialShare title={post.title} text={post.excerpt} />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <article className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg">
                {/* Content */}
                <PostContent content={post.content || ''} />

                {/* Author info */}
                <PostSource 
                  author={post.author_name || 'Redação'}
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
                          className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 text-sm rounded-full"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Related Posts */}
              <div className="mt-12">
                <RelatedPosts currentPost={post} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportagePostTemplate;
