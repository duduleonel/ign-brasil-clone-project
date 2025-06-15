
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Check, X, Eye } from 'lucide-react';

interface VisitorSubmission {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author_name: string;
  author_email: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at: string;
  category?: { name: string };
  game?: { title: string };
}

const SubmissionsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: submissions, isLoading } = useQuery({
    queryKey: ['visitor-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('visitor_submissions')
        .select(`
          *,
          category:categories(name),
          game:games(title)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as VisitorSubmission[];
    },
  });

  const updateSubmissionMutation = useMutation({
    mutationFn: async ({ id, status, admin_notes }: { id: string; status: string; admin_notes?: string }) => {
      const { error } = await supabase
        .from('visitor_submissions')
        .update({ status, admin_notes })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitor-submissions'] });
      toast({
        title: "Status atualizado",
        description: "O status do envio foi atualizado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar",
        description: "Houve um erro ao atualizar o status.",
        variant: "destructive",
      });
    },
  });

  const approveSubmissionMutation = useMutation({
    mutationFn: async (submission: VisitorSubmission) => {
      // Primeiro, cria o post aprovado
      const { error: postError } = await supabase
        .from('posts')
        .insert({
          title: submission.title,
          content: submission.content,
          excerpt: submission.excerpt,
          author: submission.author_name,
          slug: submission.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          status: 'published',
          category_id: submission.category_id,
          game_id: submission.game_id,
          featured_image: submission.featured_image
        });

      if (postError) throw postError;

      // Depois atualiza o status da submissão
      const { error: updateError } = await supabase
        .from('visitor_submissions')
        .update({ status: 'approved' })
        .eq('id', submission.id);

      if (updateError) throw updateError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitor-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Envio aprovado",
        description: "O envio foi aprovado e transformado em post.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao aprovar",
        description: "Houve um erro ao aprovar o envio.",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Aprovado</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejeitado</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleApprove = (submission: VisitorSubmission) => {
    if (window.confirm('Aprovar este envio e transformá-lo em post?')) {
      approveSubmissionMutation.mutate(submission);
    }
  };

  const handleReject = (id: string, admin_notes?: string) => {
    if (window.confirm('Rejeitar este envio?')) {
      updateSubmissionMutation.mutate({ id, status: 'rejected', admin_notes });
    }
  };

  if (isLoading) {
    return <div>Carregando envios...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Envios de Visitantes</CardTitle>
          <CardDescription>
            Gerencie os posts enviados pelos visitantes do site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {submissions?.map((submission) => (
              <div key={submission.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{submission.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Por {submission.author_name} ({submission.author_email})
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(submission.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  {getStatusBadge(submission.status)}
                </div>

                {submission.excerpt && (
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {submission.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-4 mb-3 text-sm">
                  {submission.category && (
                    <Badge variant="outline">{submission.category.name}</Badge>
                  )}
                  {submission.game && (
                    <Badge variant="outline">Jogo: {submission.game.title}</Badge>
                  )}
                </div>

                {submission.admin_notes && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded mb-3">
                    <p className="text-sm font-medium mb-1">Notas do Admin:</p>
                    <p className="text-sm">{submission.admin_notes}</p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {submission.status === 'pending' && (
                    <>
                      <Button 
                        size="sm" 
                        onClick={() => handleApprove(submission)}
                        disabled={approveSubmissionMutation.isPending || updateSubmissionMutation.isPending}
                      >
                        <Check size={16} className="mr-1" />
                        Aprovar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleReject(submission.id)}
                        disabled={updateSubmissionMutation.isPending || approveSubmissionMutation.isPending}
                      >
                        <X size={16} className="mr-1" />
                        Rejeitar
                      </Button>
                    </>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye size={16} className="mr-1" />
                        Ver Completo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{submission.title}</DialogTitle>
                        <DialogDescription>
                          Por {submission.author_name} - {new Date(submission.created_at).toLocaleDateString('pt-BR')}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <div className="prose max-w-none dark:prose-invert">
                          <div dangerouslySetInnerHTML={{ __html: submission.content }} />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}

            {submissions?.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhum envio encontrado
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionsManagement;
