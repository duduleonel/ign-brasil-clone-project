
import React from 'react';
import type { Post } from '@/types/database';
import NewsHeader from './news/NewsHeader';
import NewsSidebar from './news/NewsSidebar';
import NewsContent from './news/NewsContent';
import NewsTimeline from './news/NewsTimeline';
import NewsFooter from './news/NewsFooter';

interface NewsPostTemplateProps {
  post: Post;
}

const NewsPostTemplate: React.FC<NewsPostTemplateProps> = ({ post }) => {
  const isBreakingNews = Math.random() > 0.7; // Sample logic for breaking news

  return (
    <div className="max-w-6xl mx-auto">
      <NewsHeader post={post} isBreakingNews={isBreakingNews} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <NewsSidebar post={post} isBreakingNews={isBreakingNews} />

        <div className="lg:col-span-3 order-1 lg:order-2">
          <NewsContent post={post} />
          <NewsTimeline post={post} isBreakingNews={isBreakingNews} />
          <NewsFooter post={post} />
        </div>
      </div>
    </div>
  );
};

export default NewsPostTemplate;
