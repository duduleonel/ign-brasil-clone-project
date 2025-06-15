
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import type { VisitorSubmission } from '@/types/database';
import { useUpdateVisitorSubmission } from '@/hooks/useVisitorSubmissions';

interface SubmissionCardProps {
  submission: VisitorSubmission;
  onView: (submission: VisitorSubmission) => void;
}

const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission, onView }) => {
  const updateSubmission = useUpdateVisitorSubmission();

  const handleApprove = () => {
    updateSubmission.mutate({ id: submission.id, status: 'approved' });
  };

  const handleReject = () => {
    updateSubmission.mutate({ id: submission.id, status: 'rejected' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{submission.title}</CardTitle>
          <Badge className={getStatusColor(submission.status)}>
            {submission.status === 'pending' ? 'Pendente' : 
             submission.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Por: {submission.author_name} ({submission.author_email})
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {new Date(submission.created_at).toLocaleDateString('pt-BR')}
            </p>
          </div>
          
          {submission.excerpt && (
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
              {submission.excerpt}
            </p>
          )}

          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onView(submission)}
            >
              <Eye size={16} className="mr-2" />
              Ver
            </Button>
            {submission.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  variant="default"
                  onClick={handleApprove}
                  disabled={updateSubmission.isPending}
                >
                  <CheckCircle size={16} className="mr-2" />
                  Aprovar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleReject}
                  disabled={updateSubmission.isPending}
                >
                  <XCircle size={16} className="mr-2" />
                  Rejeitar
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmissionCard;
