
import React from 'react';
import { Calendar, User, Mic, Quote } from 'lucide-react';
import PostHeader from '../../shared/PostHeader';
import type { Post } from '@/types/database';

interface InterviewHeaderProps {
  post: Post;
  interviewee: string;
  position: string;
  company?: string;
}

const InterviewHeader: React.FC<InterviewHeaderProps> = ({ 
  post, 
  interviewee, 
  position, 
  company 
}) => {
  return (
    <div className="mb-12">
      {/* Interview-specific header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-lg mb-8">
        <div className="flex items-center mb-4">
          <Mic size={24} className="mr-3" />
          <span className="text-xl font-bold">Entrevista Exclusiva</span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Entrevistado</h3>
            <p className="text-green-100 text-xl font-bold">{interviewee}</p>
            <p className="text-green-200">{position}</p>
            {company && <p className="text-green-200 text-sm">@ {company}</p>}
          </div>
          
          <div className="flex items-center">
            <Quote size={48} className="text-green-300 mr-4" />
            <div>
              <p className="text-green-100 text-sm">
                "Compartilhando experiências e insights únicos sobre o desenvolvimento de jogos"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Standard post header */}
      <PostHeader post={post} layout="default" />
    </div>
  );
};

export default InterviewHeader;
