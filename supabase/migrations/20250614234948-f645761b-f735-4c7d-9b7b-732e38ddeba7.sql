
-- Inserir mais posts para todas as categorias
INSERT INTO public.posts (title, slug, excerpt, content, featured_image, author, category_id, game_id, read_time) VALUES

-- Entrevistas
('Entrevista: Criador do Guilty Gear fala sobre o futuro da série', 'entrevista-criador-guilty-gear', 'Daisuke Ishiwatari compartilha seus planos para os próximos jogos da franquia.', 'Em uma entrevista exclusiva, Daisuke Ishiwatari, criador da série Guilty Gear, revelou detalhes sobre o futuro da franquia. Ele discutiu a evolução do estilo visual único da série, os desafios de balanceamento em jogos competitivos e como a comunidade influencia o desenvolvimento. Ishiwatari também falou sobre a importância de manter a identidade musical da série enquanto experimenta com novos gêneros e estilos.', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8', 'Marina Oliveira', (SELECT id FROM public.categories WHERE slug = 'reviews'), (SELECT id FROM public.games WHERE slug = 'guilty-gear-strive'), 12),

('Entrevista Exclusiva: Desenvolvedor de Ikemen GO', 'entrevista-desenvolvedor-ikemen-go', 'Conversamos com um dos principais contribuidores da engine Ikemen GO.', 'Nesta entrevista reveladora, conversamos com K4thos, um dos principais desenvolvedores por trás do Ikemen GO. Ele explica como o projeto nasceu como uma evolução do Mugen, quais são os principais avanços técnicos da engine e os planos para o futuro. A entrevista também aborda os desafios de manter um projeto open source e como a comunidade pode contribuir para o desenvolvimento.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', 'Bruno Costa', (SELECT id FROM public.categories WHERE slug = 'ikemen-go'), NULL, 15),

-- Mais Reviews
('Review: King of Fighters XV - O Retorno Triunfal', 'review-kof-xv', 'Análise completa do mais novo jogo da SNK que marca o retorno da série.', 'The King of Fighters XV representa um retorno triunfal para a clássica série de luta da SNK. Com gráficos renovados, mecânicas refinadas e um roster equilibrado, o jogo consegue capturar a essência dos clássicos enquanto oferece novidades para a nova geração. O sistema de MAX Mode e as Climax Super Special Moves adicionam profundidade estratégica, enquanto o netcode garante partidas online fluidas.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', 'Diego Ferreira', (SELECT id FROM public.categories WHERE slug = 'reviews'), (SELECT id FROM public.games WHERE slug = 'kof-xv'), 10),

('Review: Guilty Gear Strive - Arte em Movimento', 'review-guilty-gear-strive', 'Uma análise aprofundada do mais belo jogo de luta já criado.', 'Guilty Gear Strive é simplesmente deslumbrante. Arc System Works elevou o padrão visual dos jogos de luta a um novo patamar com sua técnica de cel-shading 3D que parece animação 2D. Além da beleza visual, o jogo oferece mecânicas profundas, balanceamento excepcional e uma trilha sonora épica. O Wall Break system adiciona uma nova dinâmica aos combates, criando momentos cinematográficos únicos.', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8', 'Amanda Silva', (SELECT id FROM public.categories WHERE slug = 'reviews'), (SELECT id FROM public.games WHERE slug = 'guilty-gear-strive'), 11),

-- Mais Tutoriais
('Tutorial: Criando Stages para Mugen', 'tutorial-criando-stages-mugen', 'Aprenda a criar cenários impressionantes para seus jogos Mugen.', 'Criar stages no Mugen é uma arte que combina design visual com programação. Neste tutorial abrangente, você aprenderá desde os conceitos básicos de paralaxe até técnicas avançadas de animação de background. Cobrimos a criação de sprites, definição de boundaries, implementação de música ambiente e efeitos especiais. Ideal para quem quer dar vida aos seus cenários.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 'Carlos Mendoza', (SELECT id FROM public.categories WHERE slug = 'tutoriais'), NULL, 18),

('Tutorial: Programação Básica no OpenBOR', 'tutorial-programacao-openbor', 'Introdução à programação de jogos beat em up no OpenBOR.', 'OpenBOR oferece uma linguagem de script poderosa para criar jogos beat em up complexos. Este tutorial cobre os fundamentos da programação no OpenBOR, incluindo sistema de vida, combos, power-ups, inimigos com IA e sistema de fases. Aprenda a criar mecânicas únicas e implementar recursos avançados como co-op multiplayer e mini-games.', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', 'Rafael Santos', (SELECT id FROM public.categories WHERE slug = 'tutoriais'), NULL, 20),

-- Downloads
('Download: Pack Completo Street Fighter Alpha', 'download-pack-sf-alpha', 'Coletânea completa com personagens da série Street Fighter Alpha.', 'Este pack contém todos os personagens principais da série Street Fighter Alpha, incluindo Ryu, Ken, Chun-Li, Akuma e muitos outros. Todos os sprites foram extraídos em alta qualidade e organizados para facilitar a implementação em projetos Mugen. O pack também inclui stages, efeitos sonoros e música de fundo dos jogos originais.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'Lucas Almeida', (SELECT id FROM public.categories WHERE slug = 'downloads'), NULL, 3),

('Download: Lifebars Customizadas para Ikemen GO', 'download-lifebars-ikemen', 'Coleção de barras de vida estilizadas para seus projetos.', 'Uma seleção cuidadosa de lifebars customizadas para Ikemen GO, incluindo estilos clássicos, modernos e temáticos. Cada lifebar vem com documentação completa de instalação e customização. O pack inclui designs inspirados em Street Fighter, King of Fighters, Tekken e designs originais únicos.', 'https://images.unsplash.com/photo-1583394838336-acd977736f90', 'Patricia Lima', (SELECT id FROM public.categories WHERE slug = 'downloads'), NULL, 4),

-- Mugen
('Mugen: História e Evolução da Engine Lendária', 'mugen-historia-evolucao', 'A fascinante jornada da engine que revolucionou os jogos de luta caseiros.', 'Desde seu lançamento nos anos 90, o Mugen se tornou a engine de jogos de luta mais popular entre desenvolvedores independentes. Este artigo explora a história completa do Mugen, desde suas origens humildes até se tornar uma plataforma global para criadores de conteúdo. Discutimos as principais versões, marcos importantes e como a comunidade moldou seu desenvolvimento.', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 'Roberto Yamamoto', (SELECT id FROM public.categories WHERE slug = 'mugen'), NULL, 14),

-- Ikemen GO
('Ikemen GO: Recursos Avançados e Possibilidades', 'ikemen-go-recursos-avancados', 'Explorando as funcionalidades que fazem do Ikemen GO uma evolução natural.', 'Ikemen GO não é apenas uma atualização do Mugen - é uma reimaginação completa. Com suporte nativo para resoluções HD, sistema de netplay integrado, debugging avançado e compatibilidade aprimorada, a engine oferece possibilidades que eram impensáveis no Mugen tradicional. Este artigo explora todos os recursos avançados e como aproveitá-los ao máximo.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', 'Kenji Nakamura', (SELECT id FROM public.categories WHERE slug = 'ikemen-go'), NULL, 16),

-- OpenBOR
('OpenBOR: Criando Sistemas de Progressão', 'openbor-sistemas-progressao', 'Como implementar RPG elements em seus jogos beat em up.', 'OpenBOR permite a criação de sistemas complexos de progressão que vão muito além do beat em up tradicional. Neste artigo, exploramos como implementar sistemas de experiência, habilidades desbloqueáveis, inventário de itens e progressão de personagem. Aprenda a criar jogos híbridos que combinam ação com elementos de RPG.', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8', 'Sofia Rodriguez', (SELECT id FROM public.categories WHERE slug = 'openbor'), NULL, 17),

-- Notícias
('Mugen Community Championship 2024 Anunciado', 'mugen-championship-2024', 'O maior torneio mundial de Mugen acontecerá em dezembro.', 'A comunidade mundial do Mugen se prepara para o maior evento do ano. O Mugen Community Championship 2024 reunirá os melhores jogadores de todo o mundo em um torneio épico. O evento contará com premiação em dinheiro, transmissão ao vivo e showcases dos melhores personagens criados pela comunidade. As inscrições já estão abertas.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 'Alex Thompson', (SELECT id FROM public.categories WHERE slug = 'noticias'), NULL, 6),

('Nova Versão do Ikemen GO Traz Recursos Revolucionários', 'ikemen-go-nova-versao', 'Atualização mais esperada do ano finalmente foi lançada.', 'A nova versão do Ikemen GO chegou com recursos que mudarão para sempre a forma como criamos jogos de luta. Entre as novidades estão suporte para shaders customizados, sistema de ranking online, modo espectador melhorado e ferramentas de debugging em tempo real. A atualização está disponível gratuitamente no repositório oficial.', 'https://images.unsplash.com/photo-1583394838336-acd977736f90', 'Jennifer Liu', (SELECT id FROM public.categories WHERE slug = 'noticias'), NULL, 7),

-- Posts relacionados aos jogos específicos
('Como Recriar Street Fighter 6 no Mugen', 'recriar-sf6-mugen', 'Guia para reproduzir mecânicas do SF6 na engine Mugen.', 'Street Fighter 6 introduziu mecânicas inovadoras que podem ser adaptadas para o Mugen. Neste tutorial avançado, mostramos como implementar o Drive System, parry timing, e os novos tipos de super moves. Inclui código de exemplo e sprites necessários para começar seu próprio projeto baseado no SF6.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'Hiroshi Tanaka', (SELECT id FROM public.categories WHERE slug = 'tutoriais'), (SELECT id FROM public.games WHERE slug = 'street-fighter-6'), 25),

('Análise Técnica: Engine de Tekken 8', 'analise-tecnica-tekken-8', 'Estudo aprofundado da tecnologia por trás do Tekken 8.', 'Tekken 8 representa um salto tecnológico impressionante na série. Analisamos a nova engine gráfica, o sistema de física aprimorado, as melhorias no netcode e como essas inovações afetam a jogabilidade. Este artigo técnico é essencial para desenvolvedores que querem entender as tendências modernas em jogos de luta.', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', 'Dr. Maria Gonzalez', (SELECT id FROM public.categories WHERE slug = 'reviews'), (SELECT id FROM public.games WHERE slug = 'tekken-8'), 13),

('Bomb Rush Cyberfunk: Inspiração para Jogos Indie', 'bomb-rush-cyberfunk-indie', 'Como este jogo influencia a cena indie de desenvolvimento.', 'Bomb Rush Cyberfunk não é apenas um jogo - é uma declaração artística. Seu estilo visual único, trilha sonora cativante e gameplay nostálgico servem de inspiração para desenvolvedores indie ao redor do mundo. Analisamos como incorporar esses elementos em projetos Mugen e OpenBOR.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 'Emma Peterson', (SELECT id FROM public.categories WHERE slug = 'reviews'), (SELECT id FROM public.games WHERE slug = 'bomb-rush-cyberfunk'), 9);

-- Relacionar os novos posts com tags apropriadas
INSERT INTO public.post_tags (post_id, tag_id) VALUES
-- Entrevistas
((SELECT id FROM public.posts WHERE slug = 'entrevista-criador-guilty-gear'), (SELECT id FROM public.tags WHERE slug = 'avancado')),
((SELECT id FROM public.posts WHERE slug = 'entrevista-desenvolvedor-ikemen-go'), (SELECT id FROM public.tags WHERE slug = 'programacao')),

-- Reviews
((SELECT id FROM public.posts WHERE slug = 'review-kof-xv'), (SELECT id FROM public.tags WHERE slug = 'avancado')),
((SELECT id FROM public.posts WHERE slug = 'review-guilty-gear-strive'), (SELECT id FROM public.tags WHERE slug = 'avancado')),

-- Tutoriais
((SELECT id FROM public.posts WHERE slug = 'tutorial-criando-stages-mugen'), (SELECT id FROM public.tags WHERE slug = 'stage')),
((SELECT id FROM public.posts WHERE slug = 'tutorial-criando-stages-mugen'), (SELECT id FROM public.tags WHERE slug = 'sprites')),
((SELECT id FROM public.posts WHERE slug = 'tutorial-programacao-openbor'), (SELECT id FROM public.tags WHERE slug = 'programacao')),
((SELECT id FROM public.posts WHERE slug = 'tutorial-programacao-openbor'), (SELECT id FROM public.tags WHERE slug = 'avancado')),

-- Downloads
((SELECT id FROM public.posts WHERE slug = 'download-pack-sf-alpha'), (SELECT id FROM public.tags WHERE slug = 'character')),
((SELECT id FROM public.posts WHERE slug = 'download-pack-sf-alpha'), (SELECT id FROM public.tags WHERE slug = 'sprites')),
((SELECT id FROM public.posts WHERE slug = 'download-lifebars-ikemen'), (SELECT id FROM public.tags WHERE slug = 'lifebar')),

-- Posts relacionados aos jogos
((SELECT id FROM public.posts WHERE slug = 'recriar-sf6-mugen'), (SELECT id FROM public.tags WHERE slug = 'avancado')),
((SELECT id FROM public.posts WHERE slug = 'recriar-sf6-mugen'), (SELECT id FROM public.tags WHERE slug = 'programacao')),
((SELECT id FROM public.posts WHERE slug = 'analise-tecnica-tekken-8'), (SELECT id FROM public.tags WHERE slug = 'avancado')),
((SELECT id FROM public.posts WHERE slug = 'bomb-rush-cyberfunk-indie'), (SELECT id FROM public.tags WHERE slug = 'iniciante'));
