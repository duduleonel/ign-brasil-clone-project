
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
      <button
        onClick={() => navigate('/')}
        className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition-colors"
      >
        <Home size={16} className="mr-1" />
        Home
      </button>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={16} className="text-gray-400" />
          {item.href && index < items.length - 1 ? (
            <button
              onClick={() => navigate(item.href!)}
              className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-gray-900 dark:text-white font-medium">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
