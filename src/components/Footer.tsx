
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Twitch } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-4xl">🦀</div>
              <h2 className="text-3xl font-bold text-green-500">THE CRAB GAMES</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Portal dedicado ao universo das engines Mugen, Ikemen GO e OpenBOR. 
              Sua fonte definitiva para notícias, downloads, tutoriais e reviews da comunidade fighting games.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Youtube size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Twitch size={24} />
              </a>
            </div>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Notícias</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Reportagens</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Entrevistas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Reviews</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Tutoriais</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Downloads</a></li>
            </ul>
          </div>

          {/* Engines */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Engines</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Mugen</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Ikemen GO</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">OpenBOR</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Contato</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Sobre nós</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 The Crab Games. Todos os direitos reservados. | Portal dedicado às engines Mugen, Ikemen GO e OpenBOR.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
