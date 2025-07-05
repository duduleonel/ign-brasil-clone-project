
import React from 'react';
import { Quote, MessageCircle } from 'lucide-react';
import type { Post } from '@/types/database';

interface InterviewContentProps {
  post: Post;
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

const InterviewContent: React.FC<InterviewContentProps> = ({ post, questions }) => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      {post.excerpt && (
        <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
          <Quote size={24} className="text-green-600 mb-3" />
          <p className="text-lg italic text-gray-700 dark:text-gray-300">
            {post.excerpt}
          </p>
        </div>
      )}

      {/* Interview Q&A */}
      <div className="space-y-6">
        {questions.map((qa, index) => (
          <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
            {/* Question */}
            <div className="mb-4">
              <div className="flex items-start mb-2">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3 flex-shrink-0">
                  <MessageCircle size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-blue-600 dark:text-blue-400 text-sm mb-1">
                    {post.author_name || 'Entrevistador'}
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium">{qa.question}</p>
                </div>
              </div>
            </div>

            {/* Answer */}
            <div className="ml-11">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{qa.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      {post.content && (
        <div className="mt-8">
          <div 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      )}
    </div>
  );
};

export default InterviewContent;
