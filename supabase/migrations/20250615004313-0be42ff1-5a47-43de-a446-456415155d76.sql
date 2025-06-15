
-- Vamos verificar se existe algum jogo no banco de dados
-- e criar um post associado a um jogo existente
INSERT INTO public.posts (
  title, 
  slug, 
  excerpt, 
  content, 
  featured_image, 
  author, 
  status,
  category_id,
  game_id,
  read_time,
  view_count
) VALUES (
  'Análise Completa: Street Fighter 6 Revoluciona os Fighting Games',
  'analise-street-fighter-6-revoluciona-fighting-games',
  'Nossa análise completa do mais novo capítulo da franquia Street Fighter revela como a Capcom conseguiu inovar mantendo a essência clássica.',
  'Street Fighter 6 representa um marco na história dos jogos de luta. A Capcom conseguiu a difícil tarefa de inovar mantendo a essência que tornou a franquia icônica.

**Gráficos e Apresentação Visual**
Utilizando a RE Engine, o jogo oferece visuais impressionantes que combinam o estilo artístico clássico com tecnologia moderna. Cada personagem foi meticulosamente recriado com detalhes que honram suas versões clássicas.

**Sistema de Combate Renovado**
O novo Drive System adiciona profundidade estratégica sem complicar a experiência para iniciantes. As mecânicas de Drive Impact, Drive Rush e Drive Parry criam oportunidades táticas fascinantes.

**Modo World Tour - A Grande Novidade**
Pela primeira vez na série principal, temos um modo single-player robusto. Explorar Metro City, treinar com lutadores lendários e desenvolver seu próprio avatar oferece dezenas de horas de conteúdo adicional.

**Roster Equilibrado**
Com 16 lutadores no lançamento, o game oferece um elenco diversificado que agrada tanto fãs veteranos quanto novos jogadores. Cada personagem possui mecânicas únicas que os tornam viáveis em diferentes situações.

**Aspecto Online e Competitivo**
O sistema de netcode foi completamente reformulado, proporcionando experiências online estáveis mesmo em conexões menos ideais. O Battle Hub funciona como um hub social inovador.

**Conclusão**
Street Fighter 6 não é apenas mais um jogo da série - é uma declaração de que a Capcom entende perfeitamente o que os fãs querem e como atrair novos jogadores para o gênero.',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop',
  'Ana Martinez',
  'published',
  (SELECT id FROM public.categories WHERE slug = 'reviews' LIMIT 1),
  (SELECT id FROM public.games WHERE slug = 'street-fighter-6' LIMIT 1),
  12,
  892
);
