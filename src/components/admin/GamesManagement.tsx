
import React from 'react';
import { useGames } from '@/hooks/useGames';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, Star } from 'lucide-react';

const GamesManagement = () => {
  const { data: games, isLoading } = useGames();

  if (isLoading) {
    return <div>Carregando jogos...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gerenciamento de Jogos</CardTitle>
              <CardDescription>
                Adicione, edite e gerencie o catálogo de jogos
              </CardDescription>
            </div>
            <Button>
              <Plus size={16} className="mr-2" />
              Novo Jogo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games?.map((game) => (
              <div key={game.id} className="border rounded-lg overflow-hidden">
                {game.featured_image && (
                  <img 
                    src={game.featured_image} 
                    alt={game.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{game.title}</h3>
                    {game.is_featured && (
                      <Star className="text-yellow-500" size={16} />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {game.summary}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    {game.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500" size={14} />
                        <span className="text-sm">{game.rating}</span>
                      </div>
                    )}
                    {game.release_date && (
                      <span className="text-sm text-gray-500">
                        {new Date(game.release_date).getFullYear()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye size={14} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit size={14} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamesManagement;
