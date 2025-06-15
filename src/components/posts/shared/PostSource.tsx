
import React from 'react';
import { ExternalLink, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PostSourceProps {
  source?: string;
  sourceUrl?: string;
  author: string;
  publishedAt: string;
}

const PostSource: React.FC<PostSourceProps> = ({ source, sourceUrl, author, publishedAt }) => {
  return (
    <Card className="mt-8 bg-gray-50 dark:bg-gray-800 border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
          <User size={16} className="mr-2" />
          Informações da Fonte
        </h4>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>
            <span className="font-medium">Autor:</span> {author}
          </p>
          <p>
            <span className="font-medium">Publicado em:</span>{' '}
            {new Date(publishedAt).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          {source && (
            <p className="flex items-center">
              <span className="font-medium mr-2">Fonte:</span>
              {sourceUrl ? (
                <a 
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  {source}
                  <ExternalLink size={14} className="ml-1" />
                </a>
              ) : (
                source
              )}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostSource;
