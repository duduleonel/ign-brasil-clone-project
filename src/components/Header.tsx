import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X, Search, Gamepad2 } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const query = formData.get('search')?.toString();
    if (query) {
      window.location.href = `/search?query=${query}`;
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Gaming Portal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Início
            </Link>
            <Link
              to="/games"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Jogos
            </Link>
            <Link
              to="/communities"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Comunidades
            </Link>
            <Link
              to="/enviar-post"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Enviar Post
            </Link>
          </nav>

          {/* Search Bar & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="search"
                  name="search"
                  placeholder="Pesquisar..."
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-shadow"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
            <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                to="/games"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Jogos
              </Link>
              <Link
                to="/communities"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Comunidades
              </Link>
              <Link
                to="/enviar-post"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Enviar Post
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
