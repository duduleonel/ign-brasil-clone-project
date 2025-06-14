
import React, { useState } from 'react';
import { Search, Menu, X, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-black text-gray-900 dark:text-white sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      {/* Top bar */}
      <div className="bg-orange-600 text-center py-1 text-sm text-white">
        <span>🦀 Portal dedicado ao universo Mugen, Ikemen GO e OpenBOR</span>
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
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🦀</div>
              <h1 className="text-3xl font-bold text-orange-500">THE CRAB GAMES</h1>
            </div>
          </div>

          {/* Search, theme toggle and user */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
              <Search size={20} className="text-gray-500 dark:text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none"
              />
            </div>
            <ThemeToggle />
            <button className="flex items-center space-x-2 bg-orange-600 px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-white">
              <User size={18} />
              <span className="hidden sm:inline">Login</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} lg:block border-t border-gray-200 dark:border-gray-800 pt-4 pb-2`}>
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-8">
            <li><a href="#" className="block py-2 text-orange-600 hover:text-orange-500 font-semibold">HOME</a></li>
            <li><a href="#" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">NOTÍCIAS</a></li>
            <li><a href="#" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">REPORTAGENS</a></li>
            <li><a href="#" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">ENTREVISTAS</a></li>
            <li><a href="#" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">REVIEWS</a></li>
            <li><a href="#" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">TUTORIAIS</a></li>
            <li><a href="#" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">DOWNLOADS</a></li>
            <li><a href="#" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">MUGEN</a></li>
            <li><a href="#" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">IKEMEN GO</a></li>
            <li><a href="#" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">OPENBOR</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
