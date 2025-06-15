
import React from 'react';
import type { Post } from '@/types/database';
import ReviewPostCard from './ReviewPostCard';
import TutorialPostCard from './TutorialPostCard';
import DownloadPostCard from './DownloadPostCard';
import NewsPostCard from './NewsPostCard';
import InterviewPostCard from './InterviewPostCard';
import ArticleCard from '../ArticleCard';

interface PostCardFactoryProps {
  post: Post;
  isLarge?: boolean;
}

const PostCardFactory: React.FC<PostCardFactoryProps> = ({ post, isLarge = false }) => {
  const categorySlug = post.category?.slug;

  switch (categorySlug) {
    case 'reviews':
      return <ReviewPostCard post={post} isLarge={isLarge} />;
    
    case 'tutoriais':
      return <TutorialPostCard post={post} isLarge={isLarge} />;
    
    case 'downloads':
      return <DownloadPostCard post={post} isLarge={isLarge} />;
    
    case 'noticias':
      return <NewsPostCard post={post} isLarge={isLarge} />;
    
    case 'entrevistas':
      return <InterviewPostCard post={post} isLarge={isLarge} />;
    
    default:
      return <ArticleCard post={post} isLarge={isLarge} />;
  }
};

export default PostCardFactory;
