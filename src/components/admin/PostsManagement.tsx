
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePosts } from '@/hooks/usePosts';
import { Plus, Edit, Eye, Trash2 } from 'lucide-react';

const PostsManagement = () => {
  const { data: posts, isLoading } = usePosts();

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
            <Button>
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
                    <span>Por {post.author}</span>
                    <span>{new Date(post.created_at).toLocaleDateString('pt-BR')}</span>
                    <span>{post.view_count} visualizações</span>
                    {post.category && (
                      <Badge variant="outline">{post.category.name}</Badge>
                    )}
                    {getStatusBadge(post.status)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye size={16} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit size={16} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostsManagement;
