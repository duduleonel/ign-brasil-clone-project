
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Twitch } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold text-red-500 mb-4">IGN BRASIL</h2>
            <p className="text-gray-400 mb-6">
              Sua fonte definitiva para notícias, reviews e análises do mundo dos games e entretenimento.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitch size={24} />
              </a>
            </div>
          </div>

          {/* Links úteis */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Reviews</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Notícias</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Jogos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Vídeos</a></li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Contato</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Sobre nós</a></li>
              <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Trabalhe conosco</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 IGN Brasil. Todos os direitos reservados. | Desenvolvido com ❤️ para gamers brasileiros.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
