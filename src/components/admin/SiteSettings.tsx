
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SiteSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      
      if (error) throw error;
      
      // Convert array to object for easier access
      const settingsObj: { [key: string]: string } = {};
      data?.forEach(setting => {
        settingsObj[setting.key] = setting.value;
      });
      
      return settingsObj;
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key, value });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast({
        title: "Configuração atualizada",
        description: "As configurações foram salvas com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao salvar",
        description: "Houve um erro ao salvar as configurações.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Update each setting
    Object.entries({
      site_name: formData.get('site_name') as string,
      site_description: formData.get('site_description') as string,
      posts_per_page: formData.get('posts_per_page') as string,
      allow_visitor_submissions: formData.get('allow_visitor_submissions') === 'on' ? 'true' : 'false',
    }).forEach(([key, value]) => {
      updateSettingMutation.mutate({ key, value });
    });
  };

  if (isLoading) {
    return <div>Carregando configurações...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Site</CardTitle>
        <CardDescription>
          Configure as informações básicas do seu site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="site_name">Nome do Site</Label>
            <Input
              id="site_name"
              name="site_name"
              defaultValue={settings?.site_name || ''}
              placeholder="Ex: Retro Games Brasil"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="site_description">Descrição do Site</Label>
            <Textarea
              id="site_description"
              name="site_description"
              defaultValue={settings?.site_description || ''}
              placeholder="Descreva brevemente o seu site"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="posts_per_page">Posts por Página</Label>
            <Input
              id="posts_per_page"
              name="posts_per_page"
              type="number"
              min="1"
              max="50"
              defaultValue={settings?.posts_per_page || '10'}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="allow_visitor_submissions"
              name="allow_visitor_submissions"
              defaultChecked={settings?.allow_visitor_submissions === 'true'}
            />
            <Label htmlFor="allow_visitor_submissions">
              Permitir envios de visitantes
            </Label>
          </div>

          <Button type="submit" disabled={updateSettingMutation.isPending}>
            {updateSettingMutation.isPending ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SiteSettings;
