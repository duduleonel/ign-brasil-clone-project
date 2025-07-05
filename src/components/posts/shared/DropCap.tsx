
import React from 'react';

interface DropCapProps {
  children: string;
  className?: string;
}

const DropCap: React.FC<DropCapProps> = ({ children, className = '' }) => {
  if (!children) return null;

  const firstLetter = children.charAt(0);
  const restOfText = children.slice(1);

  return (
    <p className={`text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6 ${className}`}>
      <span className="float-left text-6xl lg:text-7xl font-bold leading-none text-gray-900 dark:text-white mr-3 mt-1 mb-2">
        {firstLetter}
      </span>
      <span className="text-justify">{restOfText}</span>
    </p>
  );
};

export default DropCap;
