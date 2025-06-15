
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Post } from '@/types/database';
import PostHeader from '../../shared/PostHeader';
import RelatedGameBanner from '../../shared/RelatedGameBanner';

interface NewsHeaderProps {
  post: Post;
  isBreakingNews: boolean;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ post, isBreakingNews }) => {
  const navigate = useNavigate();

  return (
    <>
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </button>

      {/* Related Game Banner */}
      {post.game && (
        <RelatedGameBanner game={post.game} />
      )}

      {/* Post Header */}
      <PostHeader 
        post={post} 
        layout="full-width"
        showLiveUpdate={isBreakingNews}
      />
    </>
  );
};

export default NewsHeader;
