
import React from 'react';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TableOfContents from '../../shared/TableOfContents';
import SocialShare from '../../shared/SocialShare';
import type { Post } from '@/types/database';

interface InterviewSidebarProps {
  post: Post;
  interviewee: {
    name: string;
    role: string;
    company: string;
    image: string;
    bio: string;
  };
}

const InterviewSidebar: React.FC<InterviewSidebarProps> = ({ post, interviewee }) => {
  return (
    <div className="lg:col-span-1 order-2 lg:order-1">
      <TableOfContents content={post.content || ''} />
      
      {/* Interviewee Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center text-sm">
            <User size={16} className="mr-2" />
            Entrevistado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-3">
            <img 
              src={interviewee.image}
              alt={interviewee.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold text-sm">{interviewee.name}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">{interviewee.role}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{interviewee.company}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6">
        <SocialShare 
          title={post.title}
          text={`Entrevista: ${post.title}`}
        />
      </div>
    </div>
  );
};

export default InterviewSidebar;
