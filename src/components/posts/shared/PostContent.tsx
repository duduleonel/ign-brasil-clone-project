
import React from 'react';
import { Quote, Image as ImageIcon, Video, FileText } from 'lucide-react';

interface PostContentProps {
  content: string;
  className?: string;
}

const PostContent: React.FC<PostContentProps> = ({ content, className = '' }) => {
  // Split content into paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim());

  const renderParagraph = (paragraph: string, index: number) => {
    // Check if it's a quote (starts with >)
    if (paragraph.startsWith('>')) {
      return (
        <blockquote key={index} className="border-l-4 border-blue-500 pl-6 my-8 bg-gray-50 dark:bg-gray-800 py-4 rounded-r-lg">
          <Quote className="text-blue-500 mb-2" size={24} />
          <p className="text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed">
            {paragraph.slice(1).trim()}
          </p>
        </blockquote>
      );
    }

    // Check if it's a heading (starts with #)
    if (paragraph.startsWith('#')) {
      const level = paragraph.match(/^#+/)?.[0].length || 1;
      const text = paragraph.replace(/^#+\s/, '');
      
      const HeadingTag = `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements;
      const headingClasses = {
        2: 'text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-12',
        3: 'text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10',
        4: 'text-xl font-bold text-gray-900 dark:text-white mb-4 mt-8',
        5: 'text-lg font-bold text-gray-900 dark:text-white mb-3 mt-6',
        6: 'text-base font-bold text-gray-900 dark:text-white mb-3 mt-6'
      }[Math.min(level + 1, 6)] || 'text-base font-bold text-gray-900 dark:text-white mb-3 mt-6';

      return (
        <HeadingTag key={index} className={headingClasses}>
          {text}
        </HeadingTag>
      );
    }

    // Regular paragraph
    return (
      <p key={index} className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6 text-justify">
        {paragraph}
      </p>
    );
  };

  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      {paragraphs.map((paragraph, index) => renderParagraph(paragraph, index))}
      
      {/* Author Bio Section */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Sobre o Autor
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Especialista em jogos retrô e cultura gaming. Apaixonado por descobrir e compartilhar 
                as melhores experiências do mundo dos games.
              </p>
              <div className="flex space-x-3">
                <button className="text-blue-500 hover:text-blue-600 transition-colors">
                  Twitter
                </button>
                <button className="text-blue-500 hover:text-blue-600 transition-colors">
                  LinkedIn
                </button>
                <button className="text-blue-500 hover:text-blue-600 transition-colors">
                  Website
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContent;
