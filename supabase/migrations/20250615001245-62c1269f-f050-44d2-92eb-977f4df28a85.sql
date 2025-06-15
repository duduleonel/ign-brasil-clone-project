
-- Primeiro, vamos verificar se todas as categorias existem e criar as que estão faltando
INSERT INTO categories (name, slug, description) VALUES
('Notícias', 'noticias', 'Últimas notícias do mundo dos jogos de luta'),
('Reportagens', 'reportagens', 'Reportagens exclusivas e análises aprofundadas'),
('Entrevistas', 'entrevistas', 'Entrevistas com desenvolvedores e personalidades'),
('Reviews', 'reviews', 'Análises completas de jogos e engines'),
('Tutoriais', 'tutoriais', 'Guias e tutoriais para desenvolvimento'),
('Downloads', 'downloads', 'Downloads de personagens, stages e recursos'),
('Mugen', 'mugen', 'Conteúdo específico sobre a engine Mugen'),
('Ikemen GO', 'ikemen-go', 'Novidades e recursos do Ikemen GO'),
('OpenBOR', 'openbor', 'Projetos e tutoriais de OpenBOR')
ON CONFLICT (slug) DO NOTHING;

-- Agora vamos limpar posts antigos dessas categorias e criar novos
DELETE FROM posts WHERE category_id IN (
  SELECT id FROM categories WHERE slug IN ('noticias', 'reportagens', 'entrevistas', 'reviews', 'tutoriais', 'downloads', 'mugen', 'ikemen-go', 'openbor')
);

-- Criar posts para Notícias
INSERT INTO posts (title, slug, excerpt, content, featured_image, author, status, category_id, read_time) VALUES
('Breaking: Novo Torneio Mundial de Fighting Games Anunciado', 'novo-torneio-mundial-fighting-games', 'O maior evento de jogos de luta do ano foi oficialmente confirmado para dezembro.', 'A comunidade mundial de fighting games está em festa com o anúncio oficial do maior torneio do ano. O evento reunirá os melhores jogadores de todo o mundo em diversas modalidades, incluindo Street Fighter, Tekken, Guilty Gear e muito mais. Com premiação recorde e transmissão global, este será um marco na história dos esports de luta.', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 'Redação TCG', 'published', (SELECT id FROM categories WHERE slug = 'noticias'), 8),

('Capcom Anuncia Novidades para Street Fighter 6', 'capcom-anuncia-novidades-sf6', 'Novos personagens e modos de jogo chegam ao SF6 em 2024.', 'A Capcom revelou seus planos ambiciosos para Street Fighter 6 em 2024, incluindo novos lutadores, stages inéditos e um modo história expandido. As novidades prometem manter o jogo relevante na cena competitiva e atrair novos jogadores para a franquia.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'João Silva', 'published', (SELECT id FROM categories WHERE slug = 'noticias'), 6);

-- Criar posts para Reportagens
INSERT INTO posts (title, slug, excerpt, content, featured_image, author, status, category_id, read_time) VALUES
('A Evolução dos Fighting Games: 30 Anos de História', 'evolucao-fighting-games-30-anos', 'Uma análise completa da evolução dos jogos de luta desde os arcade até os esports modernos.', 'Nesta reportagem especial, exploramos três décadas de evolução nos fighting games. Desde os primeiros títulos nos arcades até os modernos esports, analisamos como a tecnologia, a comunidade e a competição moldaram este gênero único. Incluindo entrevistas exclusivas com desenvolvedores pioneiros e análise técnica das principais inovações.', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8', 'Maria Santos', 'published', (SELECT id FROM categories WHERE slug = 'reportagens'), 15),

('Inside Look: Como São Criados os Personagens de Fighting Games', 'como-sao-criados-personagens-fighting', 'Um olhar por trás das cortinas do processo criativo dos lutadores.', 'Reportagem exclusiva sobre o processo de criação de personagens em fighting games, desde o conceito inicial até a implementação final. Entrevistas com artistas, animadores e designers revelam os segredos por trás dos lutadores mais icônicos da história dos games.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 'Carlos Mendoza', 'published', (SELECT id FROM categories WHERE slug = 'reportagens'), 12);

-- Criar posts para Entrevistas
INSERT INTO posts (title, slug, excerpt, content, featured_image, author, status, category_id, read_time) VALUES
('Entrevista Exclusiva: Daisuke Ishiwatari sobre o Futuro de Guilty Gear', 'entrevista-daisuke-ishiwatari-guilty-gear', 'O criador de Guilty Gear fala sobre os próximos passos da franquia.', 'Em entrevista exclusiva, Daisuke Ishiwatari, criador da série Guilty Gear, compartilha sua visão sobre o futuro da franquia, os desafios de manter a identidade visual única da série e como a comunidade influencia o desenvolvimento dos jogos. Uma conversa imperdível para fãs da série.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', 'Ana Oliveira', 'published', (SELECT id FROM categories WHERE slug = 'entrevistas'), 18),

('Conversa com os Desenvolvedores do Ikemen GO', 'entrevista-desenvolvedores-ikemen-go', 'Os criadores da engine falam sobre desafios e o futuro do projeto.', 'Entrevista com a equipe de desenvolvimento do Ikemen GO, discutindo os desafios técnicos, a filosofia open source do projeto e os planos para futuras atualizações. Uma conversa técnica e inspiradora sobre uma das engines mais promissoras para fighting games independentes.', 'https://images.unsplash.com/photo-1583394838336-acd977736f90', 'Roberto Kim', 'published', (SELECT id FROM categories WHERE slug = 'entrevistas'), 14);

-- Criar posts para Reviews
INSERT INTO posts (title, slug, excerpt, content, featured_image, author, status, category_id, read_time) VALUES
('Review: Street Fighter 6 - O Retorno Triunfal da Série', 'review-street-fighter-6', 'Análise completa do mais novo capítulo da franquia icônica.', 'Street Fighter 6 marca um retorno triunfal para a série, combinando mecânicas clássicas com inovações modernas. Nossa análise completa aborda sistema de combate, modos de jogo, netcode e como o jogo se posiciona na cena competitiva atual. Um must-have para fãs de fighting games.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'Pedro Alves', 'published', (SELECT id FROM categories WHERE slug = 'reviews'), 20),

('Review: Guilty Gear Strive - Arte em Movimento', 'review-guilty-gear-strive', 'Análise da obra-prima visual da Arc System Works.', 'Guilty Gear Strive é simplesmente deslumbrante. Nossa review explora como a Arc System Works revolucionou os visuais em fighting games, analisa as mecânicas de combate renovadas e avalia o impacto do jogo na comunidade competitiva. Uma experiência audiovisual sem precedentes.', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8', 'Lucas Ferreira', 'published', (SELECT id FROM categories WHERE slug = 'reviews'), 16);

-- Criar posts para Tutoriais
INSERT INTO posts (title, slug, excerpt, content, featured_image, author, status, category_id, read_time) VALUES
('Tutorial: Primeiros Passos no Mugen - Guia Completo para Iniciantes', 'tutorial-primeiros-passos-mugen', 'Aprenda a criar seu primeiro personagem no Mugen do zero.', 'Tutorial abrangente para iniciantes no Mugen, cobrindo desde a instalação da engine até a criação do primeiro personagem. Inclui dicas sobre sprites, comandos, programação básica e onde encontrar recursos. Perfeito para quem está começando no mundo do desenvolvimento de fighting games.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 'Diego Santos', 'published', (SELECT id FROM categories WHERE slug = 'tutoriais'), 25),

('Como Criar Stages Animados no Ikemen GO', 'tutorial-stages-animados-ikemen-go', 'Aprenda a criar cenários dinâmicos e impressionantes.', 'Tutorial detalhado sobre criação de stages com animações no Ikemen GO. Abordamos técnicas de paralaxe, efeitos de partículas, animações de fundo e otimização de performance. Inclui exemplos práticos e arquivos de demonstração.', 'https://images.unsplash.com/photo-1583394838336-acd977736f90', 'Fernanda Lima', 'published', (SELECT id FROM categories WHERE slug = 'tutoriais'), 22);

-- Criar posts para Downloads
INSERT INTO posts (title, slug, excerpt, content, featured_image, author, status, category_id, read_time) VALUES
('Download: Pack Completo Street Fighter Alpha', 'download-pack-street-fighter-alpha', 'Coletânea completa de personagens da série Alpha.', 'Pack premium contendo todos os personagens da série Street Fighter Alpha em alta qualidade. Inclui Ryu, Ken, Chun-Li, Akuma, Sakura e muitos outros. Sprites extraídos e otimizados, com documentação completa de instalação. Compatível com Mugen 1.1 e Ikemen GO.', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'Admin TCG', 'published', (SELECT id FROM categories WHERE slug = 'downloads'), 5),

('Lifebars HD Collection - Pack Exclusivo', 'download-lifebars-hd-collection', 'Coleção de barras de vida em alta definição para seus projetos.', 'Pacote exclusivo contendo 15 lifebars em resolução HD, incluindo estilos clássicos, modernos e temáticos. Todas as lifebars são totalmente funcionais e vêm com documentação de instalação. Compatível com Mugen e Ikemen GO.', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', 'Equipe TCG', 'published', (SELECT id FROM categories WHERE slug = 'downloads'), 3);

-- Criar posts para Mugen
INSERT INTO posts (title, slug, excerpt, content, featured_image, author, status, category_id, read_time) VALUES
('Mugen 1.1: As Principais Novidades e Melhorias', 'mugen-1-1-principais-novidades', 'Descubra tudo sobre a versão mais recente da engine lendária.', 'Análise completa das novidades do Mugen 1.1, incluindo melhorias de performance, novos recursos de programação, compatibilidade aprimorada e ferramentas de debug. Exploramos como essas mudanças impactam criadores de conteúdo e jogadores.', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 'Bruno Tavares', 'published', (SELECT id FROM categories WHERE slug = 'mugen'), 12),

('História do Mugen: 25 Anos de Criatividade Comunitária', 'historia-mugen-25-anos', 'A fascinante jornada da engine que revolucionou os fighting games.', 'Retrospectiva especial sobre os 25 anos do Mugen, desde suas origens humildes até se tornar a plataforma preferida para criação de fighting games independentes. Incluindo marcos históricos, personagens icônicos da comunidade e o impacto cultural da engine.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 'Marcos Ribeiro', 'published', (SELECT id FROM categories WHERE slug = 'mugen'), 15);

-- Criar posts para Ikemen GO
INSERT INTO posts (title, slug, excerpt, content, featured_image, author, status, category_id, read_time) VALUES
('Ikemen GO vs Mugen: Qual Escolher em 2024?', 'ikemen-go-vs-mugen-2024', 'Comparativo completo entre as duas principais engines de fighting games.', 'Análise detalhada comparando Ikemen GO e Mugen, abordando performance, recursos, facilidade de uso, compatibilidade e futuro de cada engine. Ajudamos você a decidir qual é a melhor opção para seu próximo projeto de fighting game.', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', 'Sandra Moraes', 'published', (SELECT id FROM categories WHERE slug = 'ikemen-go'), 18),

('Novidades do Ikemen GO: Recursos Avançados', 'ikemen-go-recursos-avancados', 'Explorando as funcionalidades mais avançadas da engine.', 'Deep dive nos recursos mais avançados do Ikemen GO, incluindo sistema de netplay, shaders customizados, debugging em tempo real e ferramentas de desenvolvimento. Tutorial prático para desenvolvedores experientes.', 'https://images.unsplash.com/photo-1583394838336-acd977736f90', 'Rafael Costa', 'published', (SELECT id FROM categories WHERE slug = 'ikemen-go'), 20);

-- Criar posts para OpenBOR
INSERT INTO posts (title, slug, excerpt, content, featured_image, author, status, category_id, read_time) VALUES
('OpenBOR: Criando Seu Primeiro Beat em Up', 'openbor-primeiro-beat-em-up', 'Guia completo para desenvolver jogos beat em up com OpenBOR.', 'Tutorial abrangente sobre desenvolvimento de jogos beat em up usando OpenBOR. Cobrimos desde o setup inicial até mecânicas avançadas como combos, power-ups e fases com múltiplos caminhos. Inclui projeto de exemplo e código fonte.', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8', 'Thiago Souza', 'published', (SELECT id FROM categories WHERE slug = 'openbor'), 30),

('OpenBOR Advanced: Programação de IA para Inimigos', 'openbor-programacao-ia-inimigos', 'Técnicas avançadas para criar inimigos inteligentes.', 'Tutorial avançado sobre programação de inteligência artificial para inimigos em OpenBOR. Exploramos padrões de comportamento, sistemas de decisão, balanceamento de dificuldade e criação de bosses memoráveis. Para desenvolvedores experientes.', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b', 'Juliana Ramos', 'published', (SELECT id FROM categories WHERE slug = 'openbor'), 25);
