
import React, { useState } from 'react';
import { Plus, X, Star, Calendar, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Game } from '@/types/database';

interface GameComparatorProps {
  availableGames: Game[];
}

const GameComparator: React.FC<GameComparatorProps> = ({ availableGames }) => {
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const [showGameSelector, setShowGameSelector] = useState(false);

  const addGame = (game: Game) => {
    if (selectedGames.length < 3 && !selectedGames.find(g => g.id === game.id)) {
      setSelectedGames([...selectedGames, game]);
      setShowGameSelector(false);
    }
  };

  const removeGame = (gameId: string) => {
    setSelectedGames(selectedGames.filter(g => g.id !== gameId));
  };

  const compareItems = [
    { key: 'rating', label: 'Avaliação', icon: Star },
    { key: 'release_date', label: 'Lançamento', icon: Calendar },
    { key: 'developer', label: 'Desenvolvedora', icon: Building2 },
    { key: 'publisher', label: 'Produtora', icon: Building2 },
  ];

  const formatValue = (key: string, value: any) => {
    switch (key) {
      case 'rating':
        return value ? `${value}/5` : 'N/A';
      case 'release_date':
        return value ? new Date(value).toLocaleDateString('pt-BR') : 'N/A';
      case 'developer':
      case 'publisher':
        return value || 'N/A';
      default:
        return value || 'N/A';
    }
  };

  const getValueColor = (key: string, value: any, allValues: any[]) => {
    if (!value) return 'text-gray-500';
    
    switch (key) {
      case 'rating':
        const numValue = parseFloat(value);
        const maxValue = Math.max(...allValues.map(v => parseFloat(v) || 0));
        return numValue === maxValue ? 'text-green-600 font-bold' : 'text-gray-900 dark:text-white';
      default:
        return 'text-gray-900 dark:text-white';
    }
  };

  if (selectedGames.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Comparador de Jogos
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Compare especificações, avaliações e preços de até 3 jogos lado a lado.
        </p>
        <Button onClick={() => setShowGameSelector(true)}>
          <Plus size={16} className="mr-2" />
          Selecionar Primeiro Jogo
        </Button>
        
        {showGameSelector && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Selecione um jogo</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowGameSelector(false)}>
                <X size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto">
              {availableGames.slice(0, 12).map((game) => (
                <div
                  key={game.id}
                  className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => addGame(game)}
                >
                  {game.featured_image && (
                    <img src={game.featured_image} alt={game.title} className="w-12 h-12 object-cover rounded" />
                  )}
                  <div>
                    <h4 className="font-medium text-sm">{game.title}</h4>
                    {game.rating && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Star size={12} className="mr-1" />
                        {game.rating}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Comparação de Jogos
          </h2>
          {selectedGames.length < 3 && (
            <Button variant="outline" onClick={() => setShowGameSelector(true)}>
              <Plus size={16} className="mr-2" />
              Adicionar Jogo
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-4 font-semibold text-gray-900 dark:text-white w-32">
                Comparação
              </th>
              {selectedGames.map((game) => (
                <th key={game.id} className="text-center p-4 min-w-48">
                  <div className="space-y-3">
                    {game.featured_image && (
                      <img 
                        src={game.featured_image} 
                        alt={game.title}
                        className="w-20 h-24 object-cover rounded mx-auto"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                        {game.title}
                      </h3>
                      {game.genre && (
                        <Badge variant="outline" className="text-xs mt-1">
                          {game.genre}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeGame(game.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareItems.map((item) => {
              const values = selectedGames.map(game => (game as any)[item.key]);
              
              return (
                <tr key={item.key} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-medium text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      {item.icon && <item.icon size={16} className="mr-2 text-gray-500" />}
                      {item.label}
                    </div>
                  </td>
                  {selectedGames.map((game, index) => {
                    const value = (game as any)[item.key];
                    const colorClass = getValueColor(item.key, value, values);
                    
                    return (
                      <td key={game.id} className={`p-4 text-center ${colorClass}`}>
                        {formatValue(item.key, value)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            
            {/* Genre Row */}
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="p-4 font-medium text-gray-900 dark:text-white">
                Gênero
              </td>
              {selectedGames.map((game) => (
                <td key={game.id} className="p-4 text-center">
                  <Badge variant="secondary" className="text-xs">
                    {game.genre || 'N/A'}
                  </Badge>
                </td>
              ))}
            </tr>

            {/* Platforms Row */}
            <tr>
              <td className="p-4 font-medium text-gray-900 dark:text-white">
                Plataformas
              </td>
              {selectedGames.map((game) => (
                <td key={game.id} className="p-4 text-center">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {game.platforms?.slice(0, 3).map((platform, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {showGameSelector && (
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Adicionar mais um jogo para comparar</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowGameSelector(false)}>
              <X size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
            {availableGames
              .filter(game => !selectedGames.find(sg => sg.id === game.id))
              .slice(0, 12)
              .map((game) => (
              <div
                key={game.id}
                className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => addGame(game)}
              >
                {game.featured_image && (
                  <img src={game.featured_image} alt={game.title} className="w-12 h-12 object-cover rounded" />
                )}
                <div>
                  <h4 className="font-medium text-sm">{game.title}</h4>
                  {game.rating && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Star size={12} className="mr-1" />
                      {game.rating}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameComparator;
