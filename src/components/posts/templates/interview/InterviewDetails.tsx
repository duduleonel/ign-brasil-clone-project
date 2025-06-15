
import React from 'react';
import { Mic, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/types/database';

interface InterviewDetailsProps {
  post: Post;
  interviewee: {
    name: string;
    role: string;
    company: string;
    image: string;
    bio: string;
  };
}

const InterviewDetails: React.FC<InterviewDetailsProps> = ({ post, interviewee }) => {
  return (
    <Card className="mb-8 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mic className="mr-2" />
          Detalhes da Entrevista
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <img 
              src={interviewee.image}
              alt={interviewee.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-lg">{interviewee.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{interviewee.role}</p>
              <p className="text-gray-600 dark:text-gray-400">{interviewee.company}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>Data: {new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex items-center">
              <Mic size={16} className="mr-2" />
              <span>Duração: 45 minutos</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span>Entrevistador: {post.author}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewDetails;
