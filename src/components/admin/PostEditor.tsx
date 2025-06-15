
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Video, Image } from 'lucide-react';

interface PostEditorProps {
  postId?: string;
  onBack: () => void;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Game {
  id: string;
  title: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

const PostEditor: React.FC<PostEditorProps> = ({ postId, onBack }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    status: 'draft',
    featured_image: '',
    category_id: '',
    game_id: ''
  });

  // Fetch existing post data if editing
  const { data: existingPost } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      if (!postId) return null;
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          tags:post_tags(tag_id)
        `)
        .eq('id', postId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!postId,
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Category[];
    },
  });

  // Fetch games
  const { data: games } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select('id, title, slug')
        .order('title');
      
      if (error) throw error;
      return data as Game[];
    },
  });

  // Fetch tags
  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Tag[];
    },
  });

  // Load existing post data
  useEffect(() => {
    if (existingPost) {
      setFormData({
        title: existingPost.title || '',
        slug: existingPost.slug || '',
        excerpt: existingPost.excerpt || '',
        content: existingPost.content || '',
        author: existingPost.author || '',
        status: existingPost.status || 'draft',
        featured_image: existingPost.featured_image || '',
        category_id: existingPost.category_id || '',
        game_id: existingPost.game_id || ''
      });
      
      // Set selected tags
      if (existingPost.tags) {
        setSelectedTags(existingPost.tags.map((t: any) => t.tag_id));
      }

      // Detect if featured_image is a video
      if (existingPost.featured_image) {
        const isVideo = existingPost.featured_image.includes('youtube.com') || 
                       existingPost.featured_image.includes('youtu.be') ||
                       existingPost.featured_image.includes('vimeo.com') ||
                       existingPost.featured_image.endsWith('.mp4') ||
                       existingPost.featured_image.endsWith('.webm');
        setMediaType(isVideo ? 'video' : 'image');
      }
    }
  }, [existingPost]);

  const createPostMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (postId) {
        // Update existing post
        const { error } = await supabase
          .from('posts')
          .update(data)
          .eq('id', postId);
        
        if (error) throw error;

        // Update tags
        await supabase.from('post_tags').delete().eq('post_id', postId);
        if (selectedTags.length > 0) {
          const tagInserts = selectedTags.map(tagId => ({
            post_id: postId,
            tag_id: tagId
          }));
          await supabase.from('post_tags').insert(tagInserts);
        }
      } else {
        // Create new post
        const { data: newPost, error } = await supabase
          .from('posts')
          .insert(data)
          .select('id')
          .single();
        
        if (error) throw error;

        // Add tags
        if (selectedTags.length > 0) {
          const tagInserts = selectedTags.map(tagId => ({
            post_id: newPost.id,
            tag_id: tagId
          }));
          await supabase.from('post_tags').insert(tagInserts);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: postId ? "Post atualizado" : "Post criado",
        description: postId ? "O post foi atualizado com sucesso." : "O post foi criado com sucesso.",
      });
      onBack();
    },
    onError: () => {
      toast({
        title: "Erro ao salvar post",
        description: "Houve um erro ao salvar o post.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPostMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'title' && !postId && { slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })
    }));
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const getMediaPlaceholder = () => {
    if (mediaType === 'video') {
      return 'URL do vídeo (YouTube, Vimeo, etc.)';
    }
    return 'URL da imagem';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft size={16} />
          </Button>
          <div>
            <CardTitle>{postId ? 'Editar Post' : 'Novo Post'}</CardTitle>
            <CardDescription>
              {postId ? 'Edite as informações do post' : 'Crie um novo post para o site'}
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
                placeholder="Digite o título do post"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="slug-do-post"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Resumo</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              placeholder="Breve descrição do post"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Conteúdo completo do post"
              rows={10}
            />
          </div>

          {/* Media Type Selection */}
          <div className="space-y-2">
            <Label>Tipo de Mídia Destacada</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={mediaType === 'image' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMediaType('image')}
              >
                <Image size={16} className="mr-2" />
                Imagem
              </Button>
              <Button
                type="button"
                variant={mediaType === 'video' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMediaType('video')}
              >
                <Video size={16} className="mr-2" />
                Vídeo
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="featured_image">
              {mediaType === 'video' ? 'Vídeo Destacado' : 'Imagem Destacada'}
            </Label>
            <Input
              id="featured_image"
              value={formData.featured_image}
              onChange={(e) => handleInputChange('featured_image', e.target.value)}
              placeholder={getMediaPlaceholder()}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="game">Jogo Relacionado</Label>
              <Select value={formData.game_id} onValueChange={(value) => handleInputChange('game_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um jogo (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhum jogo</SelectItem>
                  {games?.map((game) => (
                    <SelectItem key={game.id} value={game.id}>
                      {game.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags Selection */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded p-3">
              {tags?.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={tag.id}
                    checked={selectedTags.includes(tag.id)}
                    onCheckedChange={() => handleTagToggle(tag.id)}
                  />
                  <Label htmlFor={tag.id} className="text-sm cursor-pointer">
                    {tag.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Autor</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="Nome do autor"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                  <SelectItem value="archived">Arquivado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={createPostMutation.isPending}>
              {createPostMutation.isPending ? 'Salvando...' : (postId ? 'Atualizar Post' : 'Salvar Post')}
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

export default PostEditor;
