
-- Adicionar novos campos à tabela games para mais informações
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS cover_image text;
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS screenshots text[];
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS trailer_url text;
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS rating numeric(3,1);
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS metacritic_score integer;
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS esrb_rating text;
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS price numeric(10,2);
ALTER TABLE public.games ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;

-- Criar tabela para avaliações de usuários
CREATE TABLE IF NOT EXISTS public.game_reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id uuid NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  user_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar RLS para reviews
ALTER TABLE public.game_reviews ENABLE ROW LEVEL SECURITY;

-- Política para permitir que todos vejam as reviews
CREATE POLICY "Anyone can view game reviews" 
  ON public.game_reviews 
  FOR SELECT 
  USING (true);

-- Política para permitir inserção de reviews (sem autenticação por enquanto)
CREATE POLICY "Anyone can create game reviews" 
  ON public.game_reviews 
  FOR INSERT 
  WITH CHECK (true);

-- Criar tabela para o painel administrativo (games admin)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username text NOT NULL UNIQUE,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar RLS para admin users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Política básica para admin users
CREATE POLICY "Admin users can manage themselves" 
  ON public.admin_users 
  FOR ALL 
  USING (true);
