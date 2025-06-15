
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCreateVisitorSubmission } from '@/hooks/useVisitorSubmissions';
import { usePosts } from '@/hooks/usePosts';
import { useGames } from '@/hooks/useGames';
import { toast } from 'sonner';

const submissionSchema = z.object({
  title: z.string().min(5, 'Título deve ter pelo menos 5 caracteres'),
  content: z.string().min(100, 'Conteúdo deve ter pelo menos 100 caracteres'),
  excerpt: z.string().optional(),
  author_name: z.string().min(2, 'Nome é obrigatório'),
  author_email: z.string().email('Email inválido'),
  category_id: z.string().optional(),
  game_id: z.string().optional(),
  featured_image: z.string().url().optional().or(z.literal('')),
});

type SubmissionFormData = z.infer<typeof submissionSchema>;

const VisitorSubmissionForm: React.FC = () => {
  const createSubmission = useCreateVisitorSubmission();
  const { data: categories } = usePosts(); // Pegar categorias dos posts existentes
  const { data: games } = useGames();

  const form = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      author_name: '',
      author_email: '',
      category_id: '',
      game_id: '',
      featured_image: '',
    },
  });

  const onSubmit = async (data: SubmissionFormData) => {
    try {
      const submissionData = {
        title: data.title,
        content: data.content,
        author_name: data.author_name,
        author_email: data.author_email,
        status: 'pending' as const,
        excerpt: data.excerpt || undefined,
        category_id: data.category_id || undefined,
        game_id: data.game_id || undefined,
        featured_image: data.featured_image || undefined,
      };

      await createSubmission.mutateAsync(submissionData);
      toast.success('Submissão enviada com sucesso! Aguarde a análise.');
      form.reset();
    } catch (error) {
      toast.error('Erro ao enviar submissão. Tente novamente.');
      console.error('Error creating submission:', error);
    }
  };

  // Extrair categorias únicas dos posts
  const uniqueCategories = categories ? 
    Array.from(new Map(categories.filter(post => post.category).map(post => [post.category!.id, post.category!])).values()) 
    : [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Enviar Post para Análise</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Compartilhe seu conteúdo conosco! Após a análise, ele poderá ser publicado no site.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="author_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu Nome *</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="author_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título do Post *</FormLabel>
                    <FormControl>
                      <Input placeholder="Título atrativo para seu post" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resumo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Breve resumo do seu post (opcional)"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Nenhuma categoria</SelectItem>
                          {uniqueCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="game_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jogo Relacionado</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um jogo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Nenhum jogo</SelectItem>
                          {games?.map((game) => (
                            <SelectItem key={game.id} value={game.id}>
                              {game.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="featured_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL da Imagem de Destaque</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://exemplo.com/imagem.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo do Post *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escreva o conteúdo completo do seu post aqui..."
                        className="resize-none min-h-[300px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={createSubmission.isPending}
              >
                {createSubmission.isPending ? 'Enviando...' : 'Enviar para Análise'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorSubmissionForm;
