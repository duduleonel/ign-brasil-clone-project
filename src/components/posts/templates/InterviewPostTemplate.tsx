
import React from 'react';
import type { Post } from '@/types/database';
import InterviewHeader from './interview/InterviewHeader';
import InterviewSidebar from './interview/InterviewSidebar';
import InterviewContent from './interview/InterviewContent';

interface InterviewPostTemplateProps {
  post: Post;
}

const InterviewPostTemplate: React.FC<InterviewPostTemplateProps> = ({ post }) => {
  // Sample interview data
  const interviewee = {
    name: "João Silva",
    role: "Game Designer",
    company: "Indie Studios",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    bio: "Game designer com mais de 10 anos de experiência na indústria."
  };

  return (
    <div className="max-w-6xl mx-auto">
      <InterviewHeader post={post} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <InterviewSidebar post={post} interviewee={interviewee} />
        <InterviewContent post={post} interviewee={interviewee} />
      </div>
    </div>
  );
};

export default InterviewPostTemplate;
