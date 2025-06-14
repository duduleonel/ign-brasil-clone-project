
-- Vamos adicionar 9 posts (um para cada categoria), utilizando os slugs corretos.

-- Primeiramente, pegar o id das categorias pelo slug.
-- Este bloco só faz select, as inserts estão no bloco seguinte.

-- Notícias
INSERT INTO posts (id, title, slug, excerpt, content, author, status, category_id)
SELECT gen_random_uuid(), 'Primeira notícia do site', 'primeira-noticia', 
       'Esta é a primeira notícia publicada.', 'Conteúdo da notícia de lançamento.', 
       'Admin', 'published', c.id
FROM categories c WHERE c.slug = 'noticias';

-- Reportagens
INSERT INTO posts (id, title, slug, excerpt, content, author, status, category_id)
SELECT gen_random_uuid(), 'Grande reportagem', 'grande-reportagem', 
       'Reportagem exclusiva para a comunidade.', 'Conteúdo completo da reportagem.',
       'Admin', 'published', c.id
FROM categories c WHERE c.slug = 'reportagens';

-- Entrevistas
INSERT INTO posts (id, title, slug, excerpt, content, author, status, category_id)
SELECT gen_random_uuid(), 'Entrevista especial', 'entrevista-especial', 
       'Confira entrevista com desenvolvedor.', 'Entrevista na íntegra.',
       'Admin', 'published', c.id
FROM categories c WHERE c.slug = 'entrevistas';

-- Reviews
INSERT INTO posts (id, title, slug, excerpt, content, author, status, category_id)
SELECT gen_random_uuid(), 'Review de Jogo', 'review-de-jogo', 
       'Nossa opinião completa sobre o jogo.', 'Conteúdo do review.',
       'Admin', 'published', c.id
FROM categories c WHERE c.slug = 'reviews';

-- Tutoriais
INSERT INTO posts (id, title, slug, excerpt, content, author, status, category_id)
SELECT gen_random_uuid(), 'Tutorial inicial', 'tutorial-inicial', 
       'Aprenda o básico com este tutorial.', 'Passo a passo completo.',
       'Admin', 'published', c.id
FROM categories c WHERE c.slug = 'tutoriais';

-- Downloads
INSERT INTO posts (id, title, slug, excerpt, content, author, status, category_id)
SELECT gen_random_uuid(), 'Download exclusivo', 'download-exclusivo', 
       'Baixe arquivos exclusivos aqui.', 'Links para download.',
       'Admin', 'published', c.id
FROM categories c WHERE c.slug = 'downloads';

-- Mugen
INSERT INTO posts (id, title, slug, excerpt, content, author, status, category_id)
SELECT gen_random_uuid(), 'Novidade Mugen', 'novidade-mugen', 
       'Novidades sobre o universo Mugen.', 'Conteúdo de Mugen.',
       'Admin', 'published', c.id
FROM categories c WHERE c.slug = 'mugen';

-- Ikemen Go
INSERT INTO posts (id, title, slug, excerpt, content, author, status, category_id)
SELECT gen_random_uuid(), 'Ikemen GO: Primeiras impressões', 'ikemen-go-impressao', 
       'Primeiras impressões do Ikemen Go.', 'Experiência com Ikemen Go.',
       'Admin', 'published', c.id
FROM categories c WHERE c.slug = 'ikemen-go';

-- OpenBOR
INSERT INTO posts (id, title, slug, excerpt, content, author, status, category_id)
SELECT gen_random_uuid(), 'Projeto OpenBOR', 'projeto-openbor', 
       'Conheça um projeto OpenBOR.', 'Detalhes completos do projeto.',
       'Admin', 'published', c.id
FROM categories c WHERE c.slug = 'openbor';
