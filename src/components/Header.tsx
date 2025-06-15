
import React, { useState } from 'react';
import { Menu, X, Search, User, Settings, Send } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Início', href: '/' },
    { name: 'Notícias', href: '/categoria/noticias' },
    { name: 'Reviews', href: '/categoria/reviews' },
    { name: 'Tutoriais', href: '/categoria/tutoriais' },
    { name: 'Downloads', href: '/categoria/downloads' },
    { name: 'Jogos', href: '/jogos' },
    { name: 'Comunidades', href: '/comunidades' },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleSearch = (query: string, filters: any) => {
    if (query.trim()) {
      navigate(`/busca?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RG</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Retro Games Brasil
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  isActivePath(item.href)
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar - Desktop */}
            <div className="hidden md:block">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Submit Post Button */}
            <Link
              to="/enviar-post"
              className="hidden md:flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Send size={16} />
              <span>Enviar Post</span>
            </Link>

            {/* Admin Button */}
            <Link
              to="/admin"
              className="hidden md:flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <Settings size={16} />
              <span>Admin</span>
            </Link>

            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-green-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            {/* Mobile Search */}
            <div className="mb-4 md:hidden">
              <SearchBar onSearch={handleSearch} />
            </div>

            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-sm font-medium transition-colors hover:text-green-600 ${
                    isActivePath(item.href)
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Submit Post */}
              <Link
                to="/enviar-post"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 py-2 text-sm font-medium text-green-600 dark:text-green-400"
              >
                <Send size={16} />
                <span>Enviar Post</span>
              </Link>

              {/* Mobile Admin */}
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                <Settings size={16} />
                <span>Admin</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
