
-- Criar tabela para configurações do site (se não existir)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Inserir configurações padrão
INSERT INTO public.site_settings (key, value, description) VALUES
('site_name', 'Retro Games Brasil', 'Nome do site'),
('site_description', 'Portal de jogos retrô e engines de luta', 'Descrição do site'),
('posts_per_page', '10', 'Número de posts por página'),
('allow_visitor_submissions', 'true', 'Permitir envios de visitantes')
ON CONFLICT (key) DO NOTHING;

-- Criar tabela para envios de visitantes (se não existir)
CREATE TABLE IF NOT EXISTS public.visitor_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  featured_image text,
  author_name text NOT NULL,
  author_email text NOT NULL,
  category_id uuid REFERENCES public.categories(id),
  game_id uuid REFERENCES public.games(id),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar RLS para as tabelas
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_submissions ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes se existirem e recriar
DROP POLICY IF EXISTS "Anyone can view site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Anyone can view approved submissions" ON public.visitor_submissions;
DROP POLICY IF EXISTS "Anyone can create submissions" ON public.visitor_submissions;

-- Criar políticas para configurações do site
CREATE POLICY "Anyone can view site settings" 
  ON public.site_settings 
  FOR SELECT 
  USING (true);

-- Criar políticas para envios de visitantes
CREATE POLICY "Anyone can view approved submissions" 
  ON public.visitor_submissions 
  FOR SELECT 
  USING (status = 'approved');

CREATE POLICY "Anyone can create submissions" 
  ON public.visitor_submissions 
  FOR INSERT 
  WITH CHECK (true);
