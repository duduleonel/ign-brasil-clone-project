
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Send, FileText } from 'lucide-react';

interface SubmitFormData {
  title: string;
  content: string;
  excerpt?: string;
  author_name: string;
  author_email: string;
  category_id?: string;
}

const SubmitPost = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SubmitFormData>();

  const submitPostMutation = useMutation({
    mutationFn: async (data: SubmitFormData) => {
      const { error } = await supabase
        .from('visitor_submissions')
        .insert([data]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Post enviado com sucesso!",
        description: "Seu post foi enviado e está aguardando aprovação. Obrigado pela contribuição!",
      });
      reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar post",
        description: "Houve um erro ao enviar seu post. Tente novamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: SubmitFormData) => {
    setIsSubmitting(true);
    submitPostMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Enviar Post
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Compartilhe seu conhecimento sobre jogos retrô e engines de luta
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={24} />
                Novo Post
              </CardTitle>
              <CardDescription>
                Preencha as informações abaixo para enviar seu post. Ele será revisado antes da publicação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author_name">Seu Nome</Label>
                    <Input
                      id="author_name"
                      {...register('author_name', { required: 'Nome é obrigatório' })}
                      placeholder="Ex: João Silva"
                    />
                    {errors.author_name && (
                      <p className="text-sm text-red-500">{errors.author_name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author_email">Seu Email</Label>
                    <Input
                      id="author_email"
                      type="email"
                      {...register('author_email', { 
                        required: 'Email é obrigatório',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email inválido'
                        }
                      })}
                      placeholder="joao@exemplo.com"
                    />
                    {errors.author_email && (
                      <p className="text-sm text-red-500">{errors.author_email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título do Post</Label>
                  <Input
                    id="title"
                    {...register('title', { required: 'Título é obrigatório' })}
                    placeholder="Ex: Como criar um personagem no M.U.G.E.N"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Resumo (opcional)</Label>
                  <Textarea
                    id="excerpt"
                    {...register('excerpt')}
                    placeholder="Breve descrição do que será abordado no post..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo do Post</Label>
                  <Textarea
                    id="content"
                    {...register('content', { required: 'Conteúdo é obrigatório' })}
                    placeholder="Escreva aqui o conteúdo completo do seu post..."
                    rows={10}
                  />
                  {errors.content && (
                    <p className="text-sm text-red-500">{errors.content.message}</p>
                  )}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Diretrizes para Envio
                  </h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Certifique-se de que o conteúdo é original ou devidamente creditado</li>
                    <li>• Use linguagem clara e adequada</li>
                    <li>• Foque em conteúdo relacionado a jogos retrô e engines de luta</li>
                    <li>• Seu post será revisado antes da publicação</li>
                  </ul>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Enviar Post
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubmitPost;
