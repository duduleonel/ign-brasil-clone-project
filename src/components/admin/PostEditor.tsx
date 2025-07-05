import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';
import PostBasicInfo from './post-editor/PostBasicInfo';
import MediaSelector from './post-editor/MediaSelector';
import CategoryGameSelector from './post-editor/CategoryGameSelector';
import TagSelector from './post-editor/TagSelector';
import PostMetadata from './post-editor/PostMetadata';

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
    author_name: '',
    status: 'draft' as 'draft' | 'published' | 'updating' | 'archived',
    post_type: 'news' as 'news' | 'review' | 'interview' | 'report' | 'download' | 'tutorial',
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
        author_name: existingPost.author_name || '',
        status: existingPost.status || 'draft',
        post_type: existingPost.post_type || 'news',
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
          <PostBasicInfo 
            formData={formData}
            onInputChange={handleInputChange}
          />

          <MediaSelector
            mediaType={mediaType}
            setMediaType={setMediaType}
            featuredImage={formData.featured_image}
            onInputChange={handleInputChange}
          />

          <CategoryGameSelector
            categories={categories}
            games={games}
            categoryId={formData.category_id}
            gameId={formData.game_id}
            onInputChange={handleInputChange}
          />

          <TagSelector
            tags={tags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />

          <PostMetadata
            author={formData.author_name}
            status={formData.status}
            onInputChange={handleInputChange}
          />

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
