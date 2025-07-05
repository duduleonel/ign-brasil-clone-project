
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Check, X, Eye } from 'lucide-react';

interface VisitorSubmission {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_email: string;
  status: string;
  created_at: string;
}

const SubmissionsManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Placeholder query - since visitor_submissions table doesn't exist in current schema
  const { data: submissions, isLoading } = useQuery({
    queryKey: ['visitor-submissions'],
    queryFn: async () => {
      // Return empty array since the table doesn't exist
      return [] as VisitorSubmission[];
    },
  });

  const approveSubmissionMutation = useMutation({
    mutationFn: async (submission: VisitorSubmission) => {
      // Convert visitor submission to post
      const { error } = await supabase
        .from('posts')
        .insert({
          title: submission.title,
          content: submission.content,
          author_name: submission.author_name,
          status: 'published',
          post_type: 'news',
          slug: submission.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          excerpt: submission.content.substring(0, 200) + '...'
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitor-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast({
        title: "Submissão aprovada",
        description: "A submissão foi aprovada e publicada como post.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao aprovar",
        description: "Houve um erro ao aprovar a submissão.",
        variant: "destructive",
      });
    },
  });

  const rejectSubmissionMutation = useMutation({
    mutationFn: async (submissionId: string) => {
      // Placeholder - would delete from visitor_submissions table
      console.log('Rejecting submission:', submissionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitor-submissions'] });
      toast({
        title: "Submissão rejeitada",
        description: "A submissão foi rejeitada.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao rejeitar",
        description: "Houve um erro ao rejeitar a submissão.",
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pendente</Badge>;
      case 'approved':
        return <Badge variant="default">Aprovado</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejeitado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return <div>Carregando submissões...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Submissões</CardTitle>
          <CardDescription>
            Gerencie submissões de posts enviadas pelos visitantes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {submissions?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhuma submissão encontrada no momento.
              </div>
            ) : (
              submissions?.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{submission.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {submission.content.substring(0, 100)}...
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Por {submission.author_name}</span>
                      <span>{submission.author_email}</span>
                      <span>{new Date(submission.created_at).toLocaleDateString('pt-BR')}</span>
                      {getStatusBadge(submission.status)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-green-600 border-green-600 hover:bg-green-50"
                      onClick={() => approveSubmissionMutation.mutate(submission)}
                      disabled={approveSubmissionMutation.isPending}
                    >
                      <Check size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => rejectSubmissionMutation.mutate(submission.id)}
                      disabled={rejectSubmissionMutation.isPending}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionsManagement;
