
import React, { useState } from 'react';
import { Search, Menu, X, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black dark:bg-black text-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-red-600 text-center py-1 text-sm">
        <span>🎮 Últimas notícias do mundo dos games</span>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-3xl font-bold text-red-500">IGN BRASIL</h1>
          </div>

          {/* Search, theme toggle and user */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-800 dark:bg-gray-800 rounded-lg px-3 py-2">
              <Search size={20} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="bg-transparent text-white placeholder-gray-400 outline-none"
              />
            </div>
            <ThemeToggle />
            <button className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              <User size={18} />
              <span className="hidden sm:inline">Login</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} lg:block border-t border-gray-800 pt-4 pb-2`}>
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-8">
            <li><a href="#" className="block py-2 text-red-400 hover:text-red-300 font-semibold">HOME</a></li>
            <li><a href="#" className="block py-2 hover:text-red-400 transition-colors">REVIEWS</a></li>
            <li><a href="#" className="block py-2 hover:text-red-400 transition-colors">NOTÍCIAS</a></li>
            <li><a href="#" className="block py-2 hover:text-red-400 transition-colors">JOGOS</a></li>
            <li><a href="#" className="block py-2 hover:text-red-400 transition-colors">ENTRETENIMENTO</a></li>
            <li><a href="#" className="block py-2 hover:text-red-400 transition-colors">TECH</a></li>
            <li><a href="#" className="block py-2 hover:text-red-400 transition-colors">VÍDEOS</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
