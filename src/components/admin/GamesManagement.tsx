
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Eye, Trash2, Star } from 'lucide-react';
import GameEditor from './GameEditor';

const GamesManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showEditor, setShowEditor] = useState(false);
  const [editingGameId, setEditingGameId] = useState<string | undefined>();

  const { data: games, isLoading } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const deleteGameMutation = useMutation({
    mutationFn: async (gameId: string) => {
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', gameId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      toast({
        title: "Jogo excluído",
        description: "O jogo foi excluído com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao excluir",
        description: "Houve um erro ao excluir o jogo.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (gameId: string) => {
    setEditingGameId(gameId);
    setShowEditor(true);
  };

  const handleDelete = (gameId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este jogo?')) {
      deleteGameMutation.mutate(gameId);
    }
  };

  const handleNewGame = () => {
    setEditingGameId(undefined);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingGameId(undefined);
  };

  if (showEditor) {
    return <GameEditor gameId={editingGameId} onBack={handleCloseEditor} />;
  }

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
            <Button onClick={handleNewGame}>
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
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/jogo/${game.slug}`} target="_blank" rel="noopener noreferrer">
                          <Eye size={14} />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(game.id)}>
                        <Edit size={14} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(game.id)}
                        disabled={deleteGameMutation.isPending}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {games?.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                Nenhum jogo encontrado. Adicione seu primeiro jogo!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamesManagement;
