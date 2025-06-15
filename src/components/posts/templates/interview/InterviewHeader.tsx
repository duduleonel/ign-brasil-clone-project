
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Post } from '@/types/database';
import PostHeader from '../../shared/PostHeader';
import RelatedGameBanner from '../../shared/RelatedGameBanner';

interface InterviewHeaderProps {
  post: Post;
}

const InterviewHeader: React.FC<InterviewHeaderProps> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <>
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-green-600 dark:text-green-400 hover:text-green-500 transition-colors mb-6"
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
        layout="split"
      />
    </>
  );
};

export default InterviewHeader;
