
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
    featured_image: '',
    cover_image: '',
    cartridge_image: '',
    trailer_url: '',
    release_date: '',
    price: '',
    rating: '',
    metacritic_score: '',
    esrb_rating: '',
    is_featured: false
  });

  const createGameMutation = useMutation({
    mutationFn: async (data: any) => {
      const gameData = {
        ...data,
        price: data.price ? parseFloat(data.price) : null,
        rating: data.rating ? parseFloat(data.rating) : null,
        metacritic_score: data.metacritic_score ? parseInt(data.metacritic_score) : null,
        release_date: data.release_date || null
      };

      const { error } = await supabase
        .from('games')
        .insert(gameData);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      toast({
        title: "Jogo criado",
        description: "O jogo foi criado com sucesso.",
      });
      onBack();
    },
    onError: () => {
      toast({
        title: "Erro ao criar jogo",
        description: "Houve um erro ao criar o jogo.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createGameMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'title' && typeof value === 'string' && { 
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
              placeholder="Descrição do jogo"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="featured_image">Imagem Principal</Label>
              <Input
                id="featured_image"
                value={formData.featured_image}
                onChange={(e) => handleInputChange('featured_image', e.target.value)}
                placeholder="URL da imagem"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover_image">Capa</Label>
              <Input
                id="cover_image"
                value={formData.cover_image}
                onChange={(e) => handleInputChange('cover_image', e.target.value)}
                placeholder="URL da capa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cartridge_image">Cartucho</Label>
              <Input
                id="cartridge_image"
                value={formData.cartridge_image}
                onChange={(e) => handleInputChange('cartridge_image', e.target.value)}
                placeholder="URL do cartucho"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
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
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Nota</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.rating}
                onChange={(e) => handleInputChange('rating', e.target.value)}
                placeholder="0.0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metacritic_score">Metacritic</Label>
              <Input
                id="metacritic_score"
                type="number"
                min="0"
                max="100"
                value={formData.metacritic_score}
                onChange={(e) => handleInputChange('metacritic_score', e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="esrb_rating">Classificação ESRB</Label>
              <Input
                id="esrb_rating"
                value={formData.esrb_rating}
                onChange={(e) => handleInputChange('esrb_rating', e.target.value)}
                placeholder="E, T, M, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trailer_url">URL do Trailer</Label>
              <Input
                id="trailer_url"
                value={formData.trailer_url}
                onChange={(e) => handleInputChange('trailer_url', e.target.value)}
                placeholder="https://youtube.com/..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
            />
            <Label htmlFor="is_featured">Jogo em destaque</Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={createGameMutation.isPending}>
              {createGameMutation.isPending ? 'Salvando...' : 'Salvar Jogo'}
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
