
import React from 'react';
import { User, MapPin, Calendar, Briefcase, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/types/database';

interface InterviewDetailsProps {
  post: Post;
  interviewee: {
    name: string;
    position: string;
    company?: string;
    location?: string;
    website?: string;
    bio?: string;
    avatar?: string;
  };
}

const InterviewDetails: React.FC<InterviewDetailsProps> = ({ post, interviewee }) => {
  return (
    <div className="space-y-6">
      {/* Interviewee Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User size={20} className="mr-2" />
            Sobre o Entrevistado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4">
            {interviewee.avatar && (
              <img 
                src={interviewee.avatar} 
                alt={interviewee.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div className="flex-1">
              <h3 className="font-bold text-lg">{interviewee.name}</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Briefcase size={14} className="mr-2" />
                  <span>{interviewee.position}</span>
                </div>
                {interviewee.company && (
                  <div className="flex items-center">
                    <span className="font-medium">{interviewee.company}</span>
                  </div>
                )}
                {interviewee.location && (
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-2" />
                    <span>{interviewee.location}</span>
                  </div>
                )}
                {interviewee.website && (
                  <div className="flex items-center">
                    <Globe size={14} className="mr-2" />
                    <a 
                      href={interviewee.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-500"
                    >
                      Website
                    </a>
                  </div>
                )}
              </div>
              {interviewee.bio && (
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  {interviewee.bio}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interview Info */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Entrevista</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Conduzida por:</span>
            <span className="font-medium">{post.author_name || 'Redação'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Data:</span>
            <span className="font-medium">
              {new Date(post.created_at).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Visualizações:</span>
            <span className="font-medium">{post.view_count || 0}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewDetails;
