
import React from 'react';
import { TrendingUp, Calendar, MessageCircle } from 'lucide-react';

const Sidebar = () => {
  const trendingNews = [
    "Spider-Man 2 ganha novo trailer épico",
    "Final Fantasy XVI chega ao PC em 2024",
    "God of War Ragnarök: análise completa",
    "Cyberpunk 2077: nova expansão revelada",
    "GTA 6: vazamentos mostram gameplay"
  ];

  const upcomingGames = [
    { name: "Starfield", date: "Set 2024" },
    { name: "Assassin's Creed Mirage", date: "Out 2024" },
    { name: "Marvel's Spider-Man 2", date: "Out 2024" },
    { name: "Call of Duty MW3", date: "Nov 2024" }
  ];

  return (
    <aside className="space-y-8">
      {/* Trending */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-white font-bold text-xl mb-4 flex items-center">
          <TrendingUp className="mr-2 text-red-500" size={24} />
          Em alta
        </h3>
        <ul className="space-y-3">
          {trendingNews.map((news, index) => (
            <li key={index} className="border-b border-gray-800 pb-3 last:border-b-0">
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                {news}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Upcoming Games */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-white font-bold text-xl mb-4 flex items-center">
          <Calendar className="mr-2 text-red-500" size={24} />
          Próximos lançamentos
        </h3>
        <ul className="space-y-3">
          {upcomingGames.map((game, index) => (
            <li key={index} className="flex justify-between items-center border-b border-gray-800 pb-3 last:border-b-0">
              <span className="text-gray-300">{game.name}</span>
              <span className="text-red-400 text-sm">{game.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-6">
        <h3 className="text-white font-bold text-xl mb-4 flex items-center">
          <MessageCircle className="mr-2" size={24} />
          Newsletter
        </h3>
        <p className="text-white/90 mb-4">
          Receba as últimas notícias e reviews direto no seu email.
        </p>
        <div className="space-y-3">
          <input 
            type="email" 
            placeholder="Seu email" 
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white"
          />
          <button className="w-full bg-white text-red-600 font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Inscrever-se
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
