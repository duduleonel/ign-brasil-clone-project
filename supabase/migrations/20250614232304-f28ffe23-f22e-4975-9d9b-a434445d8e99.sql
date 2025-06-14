
-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tags table
CREATE TABLE public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create posts table
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  category_id UUID REFERENCES public.categories(id),
  author TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  view_count INTEGER NOT NULL DEFAULT 0,
  read_time INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post_tags junction table (many-to-many relationship)
CREATE TABLE public.post_tags (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Insert default categories
INSERT INTO public.categories (name, slug, description) VALUES
('Notícias', 'noticias', 'Últimas notícias do mundo Mugen, Ikemen GO e OpenBOR'),
('Reportagens', 'reportagens', 'Reportagens exclusivas e análises profundas'),
('Entrevistas', 'entrevistas', 'Entrevistas com criadores e desenvolvedores'),
('Reviews', 'reviews', 'Análises de jogos, chars e conteúdos'),
('Tutoriais', 'tutoriais', 'Guias e tutoriais passo a passo'),
('Downloads', 'downloads', 'Downloads de chars, stages, jogos e ferramentas'),
('Mugen', 'mugen', 'Conteúdo específico da engine Mugen'),
('Ikemen GO', 'ikemen-go', 'Conteúdo específico da engine Ikemen GO'),
('OpenBOR', 'openbor', 'Conteúdo específico da engine OpenBOR');

-- Insert default tags
INSERT INTO public.tags (name, slug, description) VALUES
('Char', 'char', 'Personagens para as engines'),
('Stage', 'stage', 'Cenários e backgrounds'),
('Lifebar', 'lifebar', 'Barras de vida e interfaces'),
('Jogos Completos', 'jogos-completos', 'Jogos completos prontos para download'),
('Screenpacks', 'screenpacks', 'Telas e interfaces personalizadas'),
('Funcionalidades', 'funcionalidades', 'Novas funcionalidades e recursos'),
('Ferramentas', 'ferramentas', 'Ferramentas de desenvolvimento e edição');

-- Enable Row Level Security (RLS) for posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access to categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to tags" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Allow public read access to post_tags" ON public.post_tags FOR SELECT USING (true);

-- Insert some sample posts
INSERT INTO public.posts (title, slug, excerpt, content, category_id, author, featured_image) VALUES
('Novo char de Ryu disponível para download', 'novo-char-ryu-download', 'Versão atualizada do icônico lutador de Street Fighter chegou ao Mugen com novos movimentos especiais.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', (SELECT id FROM public.categories WHERE slug = 'downloads'), 'Admin', 'photo-1606144042614-b2417e99c4e3'),
('Tutorial: Como instalar Ikemen GO', 'tutorial-instalar-ikemen-go', 'Guia completo para instalação e configuração da engine Ikemen GO em seu computador.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', (SELECT id FROM public.categories WHERE slug = 'tutoriais'), 'Admin', 'photo-1552820728-8b83bb6b773f'),
('Entrevista exclusiva com criador de OpenBOR', 'entrevista-criador-openbor', 'Conversamos com um dos principais desenvolvedores da comunidade OpenBOR sobre o futuro da engine.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', (SELECT id FROM public.categories WHERE slug = 'entrevistas'), 'Editor', 'photo-1511512578047-dfb367046420'),
('Review: King of Fighters Ultimate Mugen', 'review-kof-ultimate-mugen', 'Análise completa do mais ambicioso projeto King of Fighters para Mugen já criado.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', (SELECT id FROM public.categories WHERE slug = 'reviews'), 'Revisor', 'photo-1558618047-3c8c76ca7d13'),
('Novas funcionalidades chegam ao Ikemen GO', 'novas-funcionalidades-ikemen-go', 'Última atualização da engine traz recursos revolucionários para criadores de conteúdo.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', (SELECT id FROM public.categories WHERE slug = 'noticias'), 'Redator', 'photo-1542751371-adc38448a05e');

-- Link some tags to posts
INSERT INTO public.post_tags (post_id, tag_id) VALUES
((SELECT id FROM public.posts WHERE slug = 'novo-char-ryu-download'), (SELECT id FROM public.tags WHERE slug = 'char')),
((SELECT id FROM public.posts WHERE slug = 'tutorial-instalar-ikemen-go'), (SELECT id FROM public.tags WHERE slug = 'ferramentas')),
((SELECT id FROM public.posts WHERE slug = 'review-kof-ultimate-mugen'), (SELECT id FROM public.tags WHERE slug = 'jogos-completos')),
((SELECT id FROM public.posts WHERE slug = 'novas-funcionalidades-ikemen-go'), (SELECT id FROM public.tags WHERE slug = 'funcionalidades'));
