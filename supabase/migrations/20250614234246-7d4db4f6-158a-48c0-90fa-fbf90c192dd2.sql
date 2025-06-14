
-- Inserir apenas categorias que não existem
INSERT INTO public.categories (name, slug, description) VALUES
('Reviews', 'reviews', 'Análises detalhadas de jogos e engines'),
('Tutoriais', 'tutoriais', 'Guias e tutoriais para desenvolvimento'),
('Notícias', 'noticias', 'Últimas novidades do mundo gaming'),
('Downloads', 'downloads', 'Personagens, stages e recursos para download'),
('Mugen', 'mugen', 'Conteúdo específico sobre a engine Mugen'),
('Ikemen GO', 'ikemen-go', 'Artigos sobre a engine Ikemen GO'),
('OpenBOR', 'openbor', 'Conteúdo relacionado ao OpenBOR')
ON CONFLICT (name) DO NOTHING;

-- Inserir tags
INSERT INTO public.tags (name, slug, description) VALUES
('Iniciante', 'iniciante', 'Conteúdo para iniciantes'),
('Avançado', 'avancado', 'Conteúdo para usuários experientes'),
('Sprites', 'sprites', 'Relacionado a sprites e gráficos'),
('Audio', 'audio', 'Sons e música para jogos'),
('Programação', 'programacao', 'Aspectos técnicos de programação'),
('Character', 'character', 'Personagens para engines'),
('Stage', 'stage', 'Cenários e backgrounds'),
('Lifebar', 'lifebar', 'Barras de vida customizadas')
ON CONFLICT (name) DO NOTHING;

-- Inserir mais empresas
INSERT INTO public.companies (name, slug, type, logo_url) VALUES
('Bandai Namco', 'bandai-namco', 'publisher', 'https://images.unsplash.com/photo-1511512578047-dfb367046420'),
('Sega', 'sega', 'publisher', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3'),
('Square Enix', 'square-enix', 'publisher', 'https://images.unsplash.com/photo-1583394838336-acd977736f90'),
('FromSoftware', 'fromsoftware', 'developer', 'https://images.unsplash.com/photo-1542751371-adc38448a05e'),
('CD Projekt Red', 'cd-projekt-red', 'developer', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f'),
('Rockstar Games', 'rockstar-games', 'developer', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8')
ON CONFLICT (slug) DO NOTHING;

-- Inserir jogos de exemplo
INSERT INTO public.games (title, slug, summary, featured_image, cartridge_image, release_date) VALUES
('Street Fighter 6', 'street-fighter-6', 'A mais nova iteração da famosa série de luta da Capcom, com gráficos renovados e novo sistema de combate.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3', '2023-06-02'),
('The King of Fighters XV', 'kof-xv', 'O retorno da clássica série de luta da SNK com visuais 3D e mecânicas renovadas.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', 'https://images.unsplash.com/photo-1583394838336-acd977736f90', '2022-02-17'),
('Guilty Gear Strive', 'guilty-gear-strive', 'A mais recente entrada na série Guilty Gear com visuais impressionantes e gameplay renovado.', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', '2021-06-11'),
('Bomb Rush Cyberfunk', 'bomb-rush-cyberfunk', 'Um jogo de ação inspirado em Jet Set Radio com muito estilo e música eletrônica.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', '2023-08-18'),
('Tekken 8', 'tekken-8', 'A nova geração da série Tekken com gráficos de última geração e novos personagens.', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', 'https://images.unsplash.com/photo-1483058712412-4245e9b90334', '2024-01-26'),
('Super Mario Bros. Wonder', 'super-mario-bros-wonder', 'Uma nova aventura 2D do Mario com poderes inéditos e mundos transformáveis.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96', 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0', '2023-10-20')
ON CONFLICT (slug) DO NOTHING;

-- Relacionar jogos com plataformas
INSERT INTO public.game_platforms (game_id, platform_id) VALUES
-- Street Fighter 6
((SELECT id FROM public.games WHERE slug = 'street-fighter-6'), (SELECT id FROM public.platforms WHERE slug = 'pc')),
((SELECT id FROM public.games WHERE slug = 'street-fighter-6'), (SELECT id FROM public.platforms WHERE slug = 'ps5')),
((SELECT id FROM public.games WHERE slug = 'street-fighter-6'), (SELECT id FROM public.platforms WHERE slug = 'xbox-series')),
-- KOF XV
((SELECT id FROM public.games WHERE slug = 'kof-xv'), (SELECT id FROM public.platforms WHERE slug = 'pc')),
((SELECT id FROM public.games WHERE slug = 'kof-xv'), (SELECT id FROM public.platforms WHERE slug = 'ps5')),
-- Guilty Gear Strive
((SELECT id FROM public.games WHERE slug = 'guilty-gear-strive'), (SELECT id FROM public.platforms WHERE slug = 'pc')),
((SELECT id FROM public.games WHERE slug = 'guilty-gear-strive'), (SELECT id FROM public.platforms WHERE slug = 'ps5')),
-- Bomb Rush Cyberfunk
((SELECT id FROM public.games WHERE slug = 'bomb-rush-cyberfunk'), (SELECT id FROM public.platforms WHERE slug = 'pc')),
((SELECT id FROM public.games WHERE slug = 'bomb-rush-cyberfunk'), (SELECT id FROM public.platforms WHERE slug = 'nintendo-switch')),
-- Tekken 8
((SELECT id FROM public.games WHERE slug = 'tekken-8'), (SELECT id FROM public.platforms WHERE slug = 'pc')),
((SELECT id FROM public.games WHERE slug = 'tekken-8'), (SELECT id FROM public.platforms WHERE slug = 'ps5')),
((SELECT id FROM public.games WHERE slug = 'tekken-8'), (SELECT id FROM public.platforms WHERE slug = 'xbox-series')),
-- Super Mario Bros. Wonder
((SELECT id FROM public.games WHERE slug = 'super-mario-bros-wonder'), (SELECT id FROM public.platforms WHERE slug = 'nintendo-switch'))
ON CONFLICT (game_id, platform_id) DO NOTHING;

-- Relacionar jogos com gêneros
INSERT INTO public.game_genres (game_id, genre_id) VALUES
-- Street Fighter 6
((SELECT id FROM public.games WHERE slug = 'street-fighter-6'), (SELECT id FROM public.genres WHERE slug = 'luta')),
((SELECT id FROM public.games WHERE slug = 'street-fighter-6'), (SELECT id FROM public.genres WHERE slug = 'acao')),
-- KOF XV
((SELECT id FROM public.games WHERE slug = 'kof-xv'), (SELECT id FROM public.genres WHERE slug = 'luta')),
-- Guilty Gear Strive
((SELECT id FROM public.games WHERE slug = 'guilty-gear-strive'), (SELECT id FROM public.genres WHERE slug = 'luta')),
-- Bomb Rush Cyberfunk
((SELECT id FROM public.games WHERE slug = 'bomb-rush-cyberfunk'), (SELECT id FROM public.genres WHERE slug = 'acao')),
((SELECT id FROM public.games WHERE slug = 'bomb-rush-cyberfunk'), (SELECT id FROM public.genres WHERE slug = 'aventura')),
-- Tekken 8
((SELECT id FROM public.games WHERE slug = 'tekken-8'), (SELECT id FROM public.genres WHERE slug = 'luta')),
-- Super Mario Bros. Wonder
((SELECT id FROM public.games WHERE slug = 'super-mario-bros-wonder'), (SELECT id FROM public.genres WHERE slug = 'aventura')),
((SELECT id FROM public.games WHERE slug = 'super-mario-bros-wonder'), (SELECT id FROM public.genres WHERE slug = 'acao'))
ON CONFLICT (game_id, genre_id) DO NOTHING;

-- Relacionar jogos com empresas
INSERT INTO public.game_companies (game_id, company_id, role) VALUES
-- Street Fighter 6
((SELECT id FROM public.games WHERE slug = 'street-fighter-6'), (SELECT id FROM public.companies WHERE slug = 'capcom'), 'publisher'),
((SELECT id FROM public.games WHERE slug = 'street-fighter-6'), (SELECT id FROM public.companies WHERE slug = 'capcom'), 'developer'),
-- KOF XV
((SELECT id FROM public.games WHERE slug = 'kof-xv'), (SELECT id FROM public.companies WHERE slug = 'snk'), 'publisher'),
((SELECT id FROM public.games WHERE slug = 'kof-xv'), (SELECT id FROM public.companies WHERE slug = 'snk'), 'developer'),
-- Guilty Gear Strive
((SELECT id FROM public.games WHERE slug = 'guilty-gear-strive'), (SELECT id FROM public.companies WHERE slug = 'arc-system-works'), 'publisher'),
((SELECT id FROM public.games WHERE slug = 'guilty-gear-strive'), (SELECT id FROM public.companies WHERE slug = 'arc-system-works'), 'developer'),
-- Bomb Rush Cyberfunk
((SELECT id FROM public.games WHERE slug = 'bomb-rush-cyberfunk'), (SELECT id FROM public.companies WHERE slug = 'team-reptile'), 'developer'),
-- Tekken 8
((SELECT id FROM public.games WHERE slug = 'tekken-8'), (SELECT id FROM public.companies WHERE slug = 'bandai-namco'), 'publisher'),
-- Super Mario Bros. Wonder
((SELECT id FROM public.games WHERE slug = 'super-mario-bros-wonder'), (SELECT id FROM public.companies WHERE slug = 'nintendo'), 'publisher'),
((SELECT id FROM public.games WHERE slug = 'super-mario-bros-wonder'), (SELECT id FROM public.companies WHERE slug = 'nintendo'), 'developer')
ON CONFLICT (game_id, company_id, role) DO NOTHING;

-- Inserir comunidades parceiras
INSERT INTO public.communities (name, slug, logo_url, summary, website_url, facebook_url, twitter_url, youtube_url, discord_url) VALUES
('Mugen Brazil', 'mugen-brazil', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 'A maior comunidade brasileira dedicada ao desenvolvimento e compartilhamento de conteúdo para a engine Mugen.', 'https://mugenbrazil.com', 'https://facebook.com/mugenbrazil', 'https://twitter.com/mugenbrazil', 'https://youtube.com/mugenbrazil', 'https://discord.gg/mugenbrazil'),
('OpenBOR Brasil', 'openbor-brasil', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3', 'Comunidade focada no desenvolvimento de jogos beat em up usando a engine OpenBOR.', 'https://openborbrasiL.com', 'https://facebook.com/openborbrasil', NULL, 'https://youtube.com/openborbrasil', NULL),
('Ikemen GO Community', 'ikemen-go-community', 'https://images.unsplash.com/photo-1583394838336-acd977736f90', 'Fórum internacional dedicado à engine Ikemen GO e suas possibilidades avançadas.', 'https://ikemengo.com', NULL, 'https://twitter.com/ikemengo', NULL, 'https://discord.gg/ikemengo'),
('Fighter Maker Brasil', 'fighter-maker-brasil', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'Comunidade brasileira de criadores de jogos de luta usando diversas engines.', 'https://fightermakerbrasil.com', 'https://facebook.com/fightermakerbrasil', NULL, 'https://youtube.com/fightermakerbrasil', 'https://discord.gg/fightermakerbrasil'),
('Sprite Rippers Unite', 'sprite-rippers-unite', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', 'Grupo internacional focado na extração e compartilhamento de sprites de jogos clássicos.', 'https://spriterippers.com', NULL, 'https://twitter.com/spriterippers', NULL, 'https://discord.gg/spriterippers'),
('Retro Gaming Hub', 'retro-gaming-hub', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8', 'Portal dedicado aos jogos retrô e engines de desenvolvimento homebrew.', 'https://retrogaminghub.com', 'https://facebook.com/retrogaminghub', 'https://twitter.com/retrogaminghub', 'https://youtube.com/retrogaminghub', NULL)
ON CONFLICT (slug) DO NOTHING;

-- Inserir imagens para comunidades
INSERT INTO public.community_images (community_id, image_url, alt_text) VALUES
((SELECT id FROM public.communities WHERE slug = 'mugen-brazil'), 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 'Screenshot de personagem Mugen'),
((SELECT id FROM public.communities WHERE slug = 'mugen-brazil'), 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', 'Interface do Mugen'),
((SELECT id FROM public.communities WHERE slug = 'openbor-brasil'), 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', 'Screenshot de jogo OpenBOR'),
((SELECT id FROM public.communities WHERE slug = 'ikemen-go-community'), 'https://images.unsplash.com/photo-1483058712412-4245e9b90334', 'Interface do Ikemen GO'),
((SELECT id FROM public.communities WHERE slug = 'fighter-maker-brasil'), 'https://images.unsplash.com/photo-1578662996442-48f60103fc96', 'Showcase de personagens'),
((SELECT id FROM public.communities WHERE slug = 'sprite-rippers-unite'), 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0', 'Sprites extraídos');

-- Inserir posts de exemplo
INSERT INTO public.posts (title, slug, excerpt, content, featured_image, author, category_id, game_id, read_time) VALUES
('Review: Street Fighter 6 - A Nova Era dos Jogos de Luta', 'review-street-fighter-6', 'Uma análise completa do mais novo jogo da Capcom que promete revolucionar os jogos de luta.', 'Street Fighter 6 marca um novo capítulo na franquia icônica da Capcom. Com gráficos impressionantes, mecânicas renovadas e um sistema de controle mais acessível, o jogo consegue atrair tanto veteranos quanto novatos. O Drive System adiciona uma nova camada estratégica aos combates, enquanto o World Tour oferece uma experiência single-player robusta. A qualidade do netcode também merece destaque, proporcionando partidas online fluidas e responsivas.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'Carlos Silva', (SELECT id FROM public.categories WHERE slug = 'reviews'), (SELECT id FROM public.games WHERE slug = 'street-fighter-6'), 8),

('Tutorial: Criando Seu Primeiro Personagem no Mugen', 'tutorial-primeiro-personagem-mugen', 'Guia passo a passo para iniciantes que querem criar seu primeiro fighter.', 'Criar um personagem no Mugen pode parecer intimidador no início, mas com este guia você aprenderá os conceitos básicos. Começaremos com a organização dos arquivos, passando pela criação dos sprites básicos, animações de idle e walk, até chegar nos comandos especiais. Este tutorial é ideal para quem nunca mexeu com a engine antes e quer dar seus primeiros passos no desenvolvimento de fighters.', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 'Ana Costa', (SELECT id FROM public.categories WHERE slug = 'tutoriais'), NULL, 12),

('Tekken 8 Anunciado com Data de Lançamento', 'tekken-8-anunciado', 'Bandai Namco revela detalhes sobre o próximo jogo da série Tekken.', 'A Bandai Namco finalmente anunciou Tekken 8 com data de lançamento confirmada para janeiro de 2024. O jogo promete gráficos de nova geração, novos personagens e mecânicas aprimoradas. O trailer revelou o retorno de personagens clássicos como Kazuya, Jin e Paul, além de mostrar alguns dos novos lutadores que se juntarão ao roster.', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', 'Roberto Santos', (SELECT id FROM public.categories WHERE slug = 'noticias'), (SELECT id FROM public.games WHERE slug = 'tekken-8'), 5),

('Download: Pack de Sprites Clássicos SNK', 'download-sprites-snk', 'Coletânea com sprites de alta qualidade dos principais fighters da SNK.', 'Este pack contém sprites extraídos e organizados dos principais jogos de luta da SNK, incluindo The King of Fighters, Fatal Fury e Samurai Shodown. Todos os sprites foram cuidadosamente extraídos e organizados para facilitar o uso em projetos Mugen e outras engines. O pack inclui personagens, cenários e efeitos especiais.', 'https://images.unsplash.com/photo-1583394838336-acd977736f90', 'Pedro Lima', (SELECT id FROM public.categories WHERE slug = 'downloads'), NULL, 6),

('Ikemen GO vs Mugen: Qual Engine Escolher?', 'ikemen-go-vs-mugen', 'Comparativo detalhado entre as duas principais engines de fighting games.', 'Tanto o Mugen quanto o Ikemen GO têm suas vantagens e desvantagens. Neste artigo, analisamos as principais diferenças entre as engines, incluindo facilidade de uso, recursos disponíveis, compatibilidade e comunidade. O Mugen é mais estabelecido e tem uma vasta biblioteca de conteúdo, enquanto o Ikemen GO oferece recursos mais modernos e flexibilidade adicional.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', 'Marcos Oliveira', (SELECT id FROM public.categories WHERE slug = 'ikemen-go'), NULL, 10),

('OpenBOR: Criando Seu Beat em Up Retrô', 'openbor-beat-em-up-retro', 'Como usar a engine OpenBOR para criar jogos no estilo clássico dos arcades.', 'OpenBOR é uma engine poderosa para criar jogos beat em up no estilo dos clássicos arcades dos anos 90. Neste tutorial, exploramos como configurar o ambiente de desenvolvimento, criar personagens, implementar combos e criar fases envolventes. A engine oferece suporte a múltiplos personagens, co-op local e diversos tipos de inimigos.', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8', 'Julia Ferreira', (SELECT id FROM public.categories WHERE slug = 'openbor'), NULL, 15)
ON CONFLICT (slug) DO NOTHING;

-- Relacionar posts com tags
INSERT INTO public.post_tags (post_id, tag_id) VALUES
((SELECT id FROM public.posts WHERE slug = 'review-street-fighter-6'), (SELECT id FROM public.tags WHERE slug = 'avancado')),
((SELECT id FROM public.posts WHERE slug = 'tutorial-primeiro-personagem-mugen'), (SELECT id FROM public.tags WHERE slug = 'iniciante')),
((SELECT id FROM public.posts WHERE slug = 'tutorial-primeiro-personagem-mugen'), (SELECT id FROM public.tags WHERE slug = 'character')),
((SELECT id FROM public.posts WHERE slug = 'tutorial-primeiro-personagem-mugen'), (SELECT id FROM public.tags WHERE slug = 'sprites')),
((SELECT id FROM public.posts WHERE slug = 'download-sprites-snk'), (SELECT id FROM public.tags WHERE slug = 'sprites')),
((SELECT id FROM public.posts WHERE slug = 'download-sprites-snk'), (SELECT id FROM public.tags WHERE slug = 'character')),
((SELECT id FROM public.posts WHERE slug = 'ikemen-go-vs-mugen'), (SELECT id FROM public.tags WHERE slug = 'iniciante')),
((SELECT id FROM public.posts WHERE slug = 'openbor-beat-em-up-retro'), (SELECT id FROM public.tags WHERE slug = 'iniciante')),
((SELECT id FROM public.posts WHERE slug = 'openbor-beat-em-up-retro'), (SELECT id FROM public.tags WHERE slug = 'programacao'))
ON CONFLICT (post_id, tag_id) DO NOTHING;
