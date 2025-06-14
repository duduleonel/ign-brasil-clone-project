
-- Criar tabela para plataformas de jogos
CREATE TABLE public.platforms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para gêneros de jogos
CREATE TABLE public.genres (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para produtoras/desenvolvedoras
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('publisher', 'developer')), -- publisher = produtora, developer = desenvolvedora
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela principal de jogos
CREATE TABLE public.games (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  featured_image TEXT,
  cartridge_image TEXT,
  release_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de relacionamento entre jogos e plataformas (muitos para muitos)
CREATE TABLE public.game_platforms (
  game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  platform_id UUID NOT NULL REFERENCES public.platforms(id) ON DELETE CASCADE,
  PRIMARY KEY (game_id, platform_id)
);

-- Tabela de relacionamento entre jogos e gêneros (muitos para muitos)
CREATE TABLE public.game_genres (
  game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  genre_id UUID NOT NULL REFERENCES public.genres(id) ON DELETE CASCADE,
  PRIMARY KEY (game_id, genre_id)
);

-- Tabela de relacionamento entre jogos e empresas
CREATE TABLE public.game_companies (
  game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('publisher', 'developer')),
  PRIMARY KEY (game_id, company_id, role)
);

-- Criar tabela para comunidades/canais
CREATE TABLE public.communities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT NOT NULL,
  summary TEXT,
  website_url TEXT,
  facebook_url TEXT,
  twitter_url TEXT,
  youtube_url TEXT,
  discord_url TEXT,
  instagram_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para galeria de imagens das comunidades
CREATE TABLE public.community_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar campo game_id na tabela posts para relacionar posts com jogos
ALTER TABLE public.posts ADD COLUMN game_id UUID REFERENCES public.games(id);

-- Inserir dados de exemplo para plataformas
INSERT INTO public.platforms (name, slug, logo_url) VALUES
('PC', 'pc', 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5'),
('PlayStation 5', 'ps5', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3'),
('Xbox Series X/S', 'xbox-series', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d'),
('Nintendo Switch', 'nintendo-switch', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96'),
('Neo Geo', 'neo-geo', 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0');

-- Inserir dados de exemplo para gêneros
INSERT INTO public.genres (name, slug) VALUES
('Ação', 'acao'),
('Aventura', 'aventura'),
('RPG', 'rpg'),
('Estratégia', 'estrategia'),
('Simulação', 'simulacao'),
('Esportes', 'esportes'),
('Corrida', 'corrida'),
('Puzzle', 'puzzle'),
('Terror', 'terror'),
('Luta', 'luta');

-- Inserir dados de exemplo para empresas
INSERT INTO public.companies (name, slug, type) VALUES
('Capcom', 'capcom', 'publisher'),
('SNK', 'snk', 'publisher'),
('Arc System Works', 'arc-system-works', 'developer'),
('Team Reptile', 'team-reptile', 'developer'),
('Nintendo', 'nintendo', 'publisher'),
('Sony Interactive Entertainment', 'sony', 'publisher');
