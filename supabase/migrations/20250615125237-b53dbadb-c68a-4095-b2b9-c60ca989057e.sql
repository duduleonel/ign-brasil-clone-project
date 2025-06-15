
-- Criar tabela para submissões de visitantes
CREATE TABLE IF NOT EXISTS public.visitor_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  author_name text NOT NULL,
  author_email text NOT NULL,
  category_id uuid REFERENCES public.categories(id),
  game_id uuid REFERENCES public.games(id),
  featured_image text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Criar tabela para configurações do site
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value text NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Inserir configurações padrão do site
INSERT INTO public.site_settings (key, value, description) VALUES
('site_title', 'Gaming Portal', 'Título do site'),
('site_description', 'O melhor portal de jogos da internet', 'Descrição do site'),
('contact_email', 'contato@site.com', 'Email de contato'),
('posts_per_page', '12', 'Número de posts por página'),
('enable_visitor_submissions', 'true', 'Permitir submissões de visitantes')
ON CONFLICT (key) DO NOTHING;

-- Habilitar RLS
ALTER TABLE public.visitor_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Políticas para submissões de visitantes
CREATE POLICY "Anyone can create visitor submissions" 
  ON public.visitor_submissions 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can view approved submissions" 
  ON public.visitor_submissions 
  FOR SELECT 
  USING (status = 'approved');

-- Políticas para configurações do site
CREATE POLICY "Anyone can view site settings" 
  ON public.site_settings 
  FOR SELECT 
  USING (true);

-- Para admin: assumindo que teremos autenticação admin posteriormente
CREATE POLICY "Admins can manage visitor submissions" 
  ON public.visitor_submissions 
  FOR ALL 
  USING (true);

CREATE POLICY "Admins can manage site settings" 
  ON public.site_settings 
  FOR ALL 
  USING (true);
