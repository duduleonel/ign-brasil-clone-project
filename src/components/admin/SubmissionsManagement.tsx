
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Eye, Edit } from 'lucide-react';

interface VisitorSubmission {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  author_name: string;
  author_email: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  category_id?: string;
  game_id?: string;
  featured_image?: string;
  created_at: string;
  updated_at: string;
}

const SubmissionsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: submissions, isLoading } = useQuery({
    queryKey: ['visitor-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('visitor_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as VisitorSubmission[];
    },
  });

  const updateSubmissionMutation = useMutation({
    mutationFn: async ({ id, status, adminNotes }: { id: string; status: string; adminNotes?: string }) => {
      const { error } = await supabase
        .from('visitor_submissions')
        .update({ 
          status, 
          admin_notes: adminNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitor-submissions'] });
      toast({
        title: "Submissão atualizada",
        description: "O status da submissão foi atualizado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao atualizar",
        description: "Houve um erro ao atualizar a submissão.",
        variant: "destructive",
      });
    },
  });

  const convertToPostMutation = useMutation({
    mutationFn: async (submission: VisitorSubmission) => {
      const { error } = await supabase
        .from('posts')
        .insert({
          title: submission.title,
          slug: submission.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          excerpt: submission.excerpt,
          content: submission.content,
          author: submission.author_name,
          status: 'published',
          category_id: submission.category_id,
          game_id: submission.game_id,
          featured_image: submission.featured_image
        });
      
      if (error) throw error;
      
      // Update submission status
      await updateSubmissionMutation.mutateAsync({ 
        id: submission.id, 
        status: 'approved',
        adminNotes: 'Convertido para post publicado'
      });
    },
    onSuccess: () => {
      toast({
        title: "Post criado",
        description: "A submissão foi convertida em post com sucesso.",
      });
    },
  });

  const handleApprove = (submission: VisitorSubmission) => {
    convertToPostMutation.mutate(submission);
  };

  const handleReject = (id: string) => {
    const reason = window.prompt('Motivo da rejeição (opcional):');
    updateSubmissionMutation.mutate({ 
      id, 
      status: 'rejected', 
      adminNotes: reason || 'Rejeitado pelo administrador' 
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default" className="bg-green-500">Aprovado</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejeitado</Badge>;
      case 'pending':
      default:
        return <Badge variant="secondary">Pendente</Badge>;
    }
  };

  if (isLoading) {
    return <div>Carregando submissões...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Submissões de Visitantes</CardTitle>
          <CardDescription>
            Gerencie as submissões de conteúdo enviadas pelos visitantes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {submissions?.map((submission) => (
              <div key={submission.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{submission.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Por {submission.author_name} ({submission.author_email})
                    </p>
                    {submission.excerpt && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {submission.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{new Date(submission.created_at).toLocaleDateString('pt-BR')}</span>
                      {getStatusBadge(submission.status)}
                    </div>
                    {submission.admin_notes && (
                      <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                        <strong>Notas do admin:</strong> {submission.admin_notes}
                      </div>
                    )}
                  </div>
                </div>

                {submission.status === 'pending' && (
                  <div className="flex items-center gap-2 mt-3">
                    <Button 
                      size="sm" 
                      onClick={() => handleApprove(submission)}
                      disabled={convertToPostMutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle size={16} className="mr-1" />
                      Aprovar
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleReject(submission.id)}
                      disabled={updateSubmissionMutation.isPending}
                    >
                      <XCircle size={16} className="mr-1" />
                      Rejeitar
                    </Button>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t">
                  <details>
                    <summary className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-400">
                      Ver conteúdo completo
                    </summary>
                    <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded text-sm whitespace-pre-wrap">
                      {submission.content}
                    </div>
                  </details>
                </div>
              </div>
            ))}

            {submissions?.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhuma submissão encontrada.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionsManagement;
