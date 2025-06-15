
import React from 'react';
import { TrendingUp, Calendar, Download, Gamepad2 } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

const Sidebar = () => {
  const trendingNews = [
    "Novo char de Ryu com sprites HD",
    "Ikemen GO atualização 0.98.2",
    "Tutorial: Criando lifebars customizadas",
    "OpenBOR: Streets of Rage Remake",
    "Coleção completa de stages KOF"
  ];

  const upcomingReleases = [
    { name: "Street Fighter Alpha Collection", engine: "Mugen", date: "Jan 2025" },
    { name: "KOF Ultimate Edition", engine: "Ikemen GO", date: "Fev 2025" },
    { name: "Final Fight Remake", engine: "OpenBOR", date: "Mar 2025" },
    { name: "Tekken 3D Collection", engine: "Mugen", date: "Abr 2025" }
  ];

  const featuredDownloads = [
    { name: "Goku Ultra Instinct", type: "Char", downloads: "15.2k" },
    { name: "Tournament Stage Pack", type: "Stage", downloads: "8.7k" },
    { name: "Anime Lifebar HD", type: "Lifebar", downloads: "12.1k" },
    { name: "Dragon Ball Screenpack", type: "Screenpack", downloads: "9.3k" }
  ];

  return (
    <aside className="space-y-8">
      {/* Trending */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-4 flex items-center">
          <TrendingUp className="mr-2 text-green-600" size={24} />
          Em alta
        </h3>
        <ul className="space-y-3">
          {trendingNews.map((news, index) => (
            <li key={index} className="border-b border-gray-200 dark:border-gray-800 pb-3 last:border-b-0">
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors text-sm">
                {news}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Upcoming Releases */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-4 flex items-center">
          <Calendar className="mr-2 text-green-600" size={24} />
          Próximos lançamentos
        </h3>
        <ul className="space-y-3">
          {upcomingReleases.map((release, index) => (
            <li key={index} className="border-b border-gray-200 dark:border-gray-800 pb-3 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{release.name}</span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{release.engine}</div>
                </div>
                <span className="text-green-600 dark:text-green-400 text-sm">{release.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Featured Downloads */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md dark:shadow-none border border-gray-200 dark:border-gray-700">
        <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-4 flex items-center">
          <Download className="mr-2 text-green-600" size={24} />
          Downloads em destaque
        </h3>
        <ul className="space-y-3">
          {featuredDownloads.map((item, index) => (
            <li key={index} className="border-b border-gray-200 dark:border-gray-800 pb-3 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">{item.name}</span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{item.type}</div>
                </div>
                <span className="text-green-600 dark:text-green-400 text-sm">{item.downloads}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter */}
      <NewsletterSignup />
    </aside>
  );
};

export default Sidebar;
