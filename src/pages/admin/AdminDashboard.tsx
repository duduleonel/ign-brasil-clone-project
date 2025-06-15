
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Gamepad2, Users, Send } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import { useGames } from '@/hooks/useGames';
import { useCommunities } from '@/hooks/useCommunities';
import { useVisitorSubmissions } from '@/hooks/useVisitorSubmissions';

const AdminDashboard: React.FC = () => {
  const { data: posts } = usePosts();
  const { data: games } = useGames();
  const { data: communities } = useCommunities();
  const { data: submissions } = useVisitorSubmissions();

  const stats = [
    {
      title: 'Total de Posts',
      value: posts?.length || 0,
      icon: FileText,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Total de Jogos',
      value: games?.length || 0,
      icon: Gamepad2,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Comunidades',
      value: communities?.length || 0,
      icon: Users,
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Submissões Pendentes',
      value: submissions?.filter(s => s.status === 'pending').length || 0,
      icon: Send,
      color: 'text-orange-600 dark:text-orange-400',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Administrativo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Visão geral do seu site de jogos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Posts Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {posts?.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {post.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {post.author} • {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submissões Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {submissions?.slice(0, 5).map((submission) => (
                  <div key={submission.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {submission.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {submission.author_name} • {new Date(submission.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      submission.status === 'approved' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : submission.status === 'rejected'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {submission.status === 'approved' ? 'Aprovado' : 
                       submission.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
