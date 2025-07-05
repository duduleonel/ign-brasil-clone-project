
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';

interface GameEditorProps {
  gameId?: string;
  onBack: () => void;
}

const GameEditor: React.FC<GameEditorProps> = ({ gameId, onBack }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    description: '',
    featured_image: '',
    release_date: '',
    rating: '',
    genre: '',
    developer: '',
    publisher: '',
    platforms: '',
    download_link: '',
    official_site: ''
  });

  // Fetch existing game data if editing
  const { data: existingGame } = useQuery({
    queryKey: ['game', gameId],
    queryFn: async () => {
      if (!gameId) return null;
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', gameId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!gameId,
  });

  // Load existing game data
  useEffect(() => {
    if (existingGame) {
      setFormData({
        title: existingGame.title || '',
        slug: existingGame.slug || '',
        summary: existingGame.summary || '',
        description: existingGame.description || '',
        featured_image: existingGame.featured_image || '',
        release_date: existingGame.release_date || '',
        rating: existingGame.rating?.toString() || '',
        genre: existingGame.genre || '',
        developer: existingGame.developer || '',
        publisher: existingGame.publisher || '',
        platforms: existingGame.platforms?.join(', ') || '',
        download_link: existingGame.download_link || '',
        official_site: existingGame.official_site || ''
      });
    }
  }, [existingGame]);

  const createGameMutation = useMutation({
    mutationFn: async (data: any) => {
      const gameData = {
        ...data,
        rating: data.rating ? parseFloat(data.rating) : null,
        release_date: data.release_date || null,
        platforms: data.platforms ? data.platforms.split(',').map((p: string) => p.trim()) : null
      };

      if (gameId) {
        // Update existing game
        const { error } = await supabase
          .from('games')
          .update(gameData)
          .eq('id', gameId);
        
        if (error) throw error;
      } else {
        // Create new game
        const { error } = await supabase
          .from('games')
          .insert(gameData);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      toast({
        title: gameId ? "Jogo atualizado" : "Jogo criado",
        description: gameId ? "O jogo foi atualizado com sucesso." : "O jogo foi criado com sucesso.",
      });
      onBack();
    },
    onError: () => {
      toast({
        title: "Erro ao salvar jogo",
        description: "Houve um erro ao salvar o jogo.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createGameMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'title' && !gameId && { 
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') 
      })
    }));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft size={16} />
          </Button>
          <div>
            <CardTitle>{gameId ? 'Editar Jogo' : 'Novo Jogo'}</CardTitle>
            <CardDescription>
              {gameId ? 'Edite as informações do jogo' : 'Adicione um novo jogo ao catálogo'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Nome do jogo"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="slug-do-jogo"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Resumo</Label>
            <Textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              placeholder="Resumo do jogo"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descrição completa do jogo"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="featured_image">Imagem Principal</Label>
            <Input
              id="featured_image"
              value={formData.featured_image}
              onChange={(e) => handleInputChange('featured_image', e.target.value)}
              placeholder="URL da imagem"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="release_date">Data de Lançamento</Label>
              <Input
                id="release_date"
                type="date"
                value={formData.release_date}
                onChange={(e) => handleInputChange('release_date', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Nota</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => handleInputChange('rating', e.target.value)}
                placeholder="0.0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">Gênero</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => handleInputChange('genre', e.target.value)}
                placeholder="Ação, RPG, etc."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="developer">Desenvolvedor</Label>
              <Input
                id="developer"
                value={formData.developer}
                onChange={(e) => handleInputChange('developer', e.target.value)}
                placeholder="Nome do desenvolvedor"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publisher">Produtora</Label>
              <Input
                id="publisher"
                value={formData.publisher}
                onChange={(e) => handleInputChange('publisher', e.target.value)}
                placeholder="Nome da produtora"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="platforms">Plataformas</Label>
            <Input
              id="platforms"
              value={formData.platforms}
              onChange={(e) => handleInputChange('platforms', e.target.value)}
              placeholder="PC, PlayStation, Xbox (separado por vírgula)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="download_link">Link de Download</Label>
              <Input
                id="download_link"
                value={formData.download_link}
                onChange={(e) => handleInputChange('download_link', e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="official_site">Site Oficial</Label>
              <Input
                id="official_site"
                value={formData.official_site}
                onChange={(e) => handleInputChange('official_site', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={createGameMutation.isPending}>
              {createGameMutation.isPending ? 'Salvando...' : (gameId ? 'Atualizar Jogo' : 'Salvar Jogo')}
            </Button>
            <Button type="button" variant="outline" onClick={onBack}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default GameEditor;
