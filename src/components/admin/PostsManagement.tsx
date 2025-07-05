
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Eye, Trash2 } from 'lucide-react';
import PostEditor from './PostEditor';

const PostsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showEditor, setShowEditor] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | undefined>();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          category:categories(name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Post excluído",
        description: "O post foi excluído com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao excluir",
        description: "Houve um erro ao excluir o post.",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default">Publicado</Badge>;
      case 'draft':
        return <Badge variant="secondary">Rascunho</Badge>;
      case 'archived':
        return <Badge variant="outline">Arquivado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleEdit = (postId: string) => {
    setEditingPostId(postId);
    setShowEditor(true);
  };

  const handleDelete = (postId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      deletePostMutation.mutate(postId);
    }
  };

  const handleNewPost = () => {
    setEditingPostId(undefined);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingPostId(undefined);
  };

  if (showEditor) {
    return <PostEditor postId={editingPostId} onBack={handleCloseEditor} />;
  }

  if (isLoading) {
    return <div>Carregando posts...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gerenciamento de Posts</CardTitle>
              <CardDescription>
                Crie, edite e gerencie todos os posts do site
              </CardDescription>
            </div>
            <Button onClick={handleNewPost}>
              <Plus size={16} className="mr-2" />
              Novo Post
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts?.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Por {post.author_name}</span>
                    <span>{new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                    <span>{post.view_count} visualizações</span>
                    {post.category && (
                      <Badge variant="outline">{post.category.name}</Badge>
                    )}
                    {getStatusBadge(post.status || 'draft')}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/post/${post.slug}`} target="_blank" rel="noopener noreferrer">
                      <Eye size={16} />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(post.id)}>
                    <Edit size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(post.id)}
                    disabled={deletePostMutation.isPending}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}

            {posts?.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhum post encontrado. Crie seu primeiro post!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostsManagement;
