
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SiteSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<Record<string, any>>({});

  const { data: siteSettings, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      
      if (error) throw error;
      
      const settingsMap: Record<string, any> = {};
      data?.forEach(setting => {
        settingsMap[setting.setting_key] = setting.setting_value;
      });
      
      setSettings(settingsMap);
      return settingsMap;
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string, value: any }) => {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          setting_key: key,
          setting_value: value
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast({
        title: "Configurações atualizadas",
        description: "As configurações do site foram atualizadas com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao salvar",
        description: "Houve um erro ao salvar as configurações.",
        variant: "destructive",
      });
    },
  });

  const handleSave = (key: string, value: any) => {
    updateSettingMutation.mutate({ key, value });
  };

  const handleInputChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (isLoading) {
    return <div>Carregando configurações...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Site</CardTitle>
          <CardDescription>
            Gerencie as configurações gerais do site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="site_title">Título do Site</Label>
            <Input
              id="site_title"
              value={settings.site_title || ''}
              onChange={(e) => handleInputChange('site_title', e.target.value)}
              placeholder="The Crab Games"
            />
            <Button 
              className="mt-2" 
              size="sm"
              onClick={() => handleSave('site_title', settings.site_title)}
            >
              Salvar
            </Button>
          </div>

          <div>
            <Label htmlFor="site_description">Descrição do Site</Label>
            <Textarea
              id="site_description"
              value={settings.site_description || ''}
              onChange={(e) => handleInputChange('site_description', e.target.value)}
              placeholder="Seu portal definitivo para o universo Mugen, Ikemen GO e OpenBOR"
            />
            <Button 
              className="mt-2" 
              size="sm"
              onClick={() => handleSave('site_description', settings.site_description)}
            >
              Salvar
            </Button>
          </div>

          <div>
            <Label htmlFor="contact_email">Email de Contato</Label>
            <Input
              id="contact_email"
              type="email"
              value={settings.contact_email || ''}
              onChange={(e) => handleInputChange('contact_email', e.target.value)}
              placeholder="contato@thecrabgames.com"
            />
            <Button 
              className="mt-2" 
              size="sm"
              onClick={() => handleSave('contact_email', settings.contact_email)}
            >
              Salvar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettings;
