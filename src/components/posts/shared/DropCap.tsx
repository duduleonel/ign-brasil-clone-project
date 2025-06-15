
import React from 'react';

interface DropCapProps {
  children: string;
  className?: string;
}

const DropCap: React.FC<DropCapProps> = ({ children, className = '' }) => {
  if (!children || children.length === 0) return <>{children}</>;

  const firstChar = children.charAt(0);
  const restOfText = children.slice(1);

  return (
    <p className={`text-lg leading-relaxed ${className}`}>
      <span className="float-left text-6xl font-bold leading-none pr-2 pt-1 text-purple-600 dark:text-purple-400">
        {firstChar}
      </span>
      {restOfText}
    </p>
  );
};

export default DropCap;
