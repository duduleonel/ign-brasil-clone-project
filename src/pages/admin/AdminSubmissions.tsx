
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import SubmissionCard from '@/components/admin/SubmissionCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useVisitorSubmissions } from '@/hooks/useVisitorSubmissions';
import type { VisitorSubmission } from '@/types/database';

const AdminSubmissions: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedSubmission, setSelectedSubmission] = useState<VisitorSubmission | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: submissions, isLoading } = useVisitorSubmissions(selectedStatus);

  const handleViewSubmission = (submission: VisitorSubmission) => {
    setSelectedSubmission(submission);
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Carregando submissões...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Submissões de Visitantes
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Gerencie as submissões de posts enviadas pelos visitantes
            </p>
          </div>

          <div className="flex gap-4">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="approved">Aprovados</SelectItem>
                <SelectItem value="rejected">Rejeitados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions?.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              onView={handleViewSubmission}
            />
          ))}
        </div>

        {submissions?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Nenhuma submissão encontrada.
            </p>
          </div>
        )}

        {/* Modal para visualizar submissão */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            {selectedSubmission && (
              <>
                <DialogHeader>
                  <div className="flex justify-between items-start">
                    <DialogTitle className="text-xl">
                      {selectedSubmission.title}
                    </DialogTitle>
                    <Badge className={getStatusColor(selectedSubmission.status)}>
                      {selectedSubmission.status === 'pending' ? 'Pendente' : 
                       selectedSubmission.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                    </Badge>
                  </div>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Autor:</strong> {selectedSubmission.author_name} ({selectedSubmission.author_email})
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Data:</strong> {new Date(selectedSubmission.created_at).toLocaleDateString('pt-BR')}
                    </p>
                    {selectedSubmission.category && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Categoria:</strong> {selectedSubmission.category.name}
                      </p>
                    )}
                    {selectedSubmission.game && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Jogo:</strong> {selectedSubmission.game.title}
                      </p>
                    )}
                  </div>

                  {selectedSubmission.excerpt && (
                    <div>
                      <h3 className="font-semibold mb-2">Resumo:</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedSubmission.excerpt}
                      </p>
                    </div>
                  )}

                  {selectedSubmission.featured_image && (
                    <div>
                      <h3 className="font-semibold mb-2">Imagem de Destaque:</h3>
                      <img
                        src={selectedSubmission.featured_image}
                        alt="Imagem de destaque"
                        className="max-w-full h-auto rounded-lg"
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold mb-2">Conteúdo:</h3>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="whitespace-pre-wrap">
                        {selectedSubmission.content}
                      </p>
                    </div>
                  </div>

                  {selectedSubmission.admin_notes && (
                    <div>
                      <h3 className="font-semibold mb-2">Notas Administrativas:</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedSubmission.admin_notes}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminSubmissions;
