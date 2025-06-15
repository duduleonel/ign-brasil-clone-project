
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Game } from '@/types/database';

export const useGames = (limit?: number, genreSlug?: string, platformSlug?: string, publisherSlug?: string, year?: number) => {
  return useQuery({
    queryKey: ['games', limit, genreSlug, platformSlug, publisherSlug, year],
    queryFn: async () => {
      let query = supabase
        .from('games')
        .select(`
          *,
          platforms:game_platforms(platform:platforms(id, name, slug, logo_url, created_at)),
          genres:game_genres(genre:genres(id, name, slug, created_at)),
          publishers:game_companies!inner(company:companies!inner(id, name, slug, type, logo_url, created_at)),
          developers:game_companies!inner(company:companies!inner(id, name, slug, type, logo_url, created_at))
        `)
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching games:', error);
        throw error;
      }

      let formattedData = data?.map(game => ({
        ...game,
        platforms: game.platforms ? game.platforms.map((p: any) => p.platform) : [],
        genres: game.genres ? game.genres.map((g: any) => g.genre) : [],
        publishers: game.publishers ? game.publishers.filter((c: any) => c.company.type === 'publisher').map((c: any) => c.company) : [],
        developers: game.developers ? game.developers.filter((c: any) => c.company.type === 'developer').map((c: any) => c.company) : []
      })) || [];

      // Aplicar filtros no frontend
      if (genreSlug && genreSlug !== '') {
        formattedData = formattedData.filter(game => 
          game.genres?.some(genre => genre.slug === genreSlug)
        );
      }

      if (platformSlug && platformSlug !== '') {
        formattedData = formattedData.filter(game => 
          game.platforms?.some(platform => platform.slug === platformSlug)
        );
      }

      if (publisherSlug && publisherSlug !== '') {
        formattedData = formattedData.filter(game => 
          game.publishers?.some(publisher => publisher.slug === publisherSlug)
        );
      }

      if (year && year > 0) {
        formattedData = formattedData.filter(game => 
          game.release_date && new Date(game.release_date).getFullYear() === year
        );
      }

      console.log('Games data:', formattedData);
      return formattedData as Game[];
    },
  });
};

export const useGame = (slug: string) => {
  return useQuery({
    queryKey: ['game', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select(`
          *,
          platforms:game_platforms(platform:platforms(id, name, slug, logo_url, created_at)),
          genres:game_genres(genre:genres(id, name, slug, created_at)),
          publishers:game_companies!inner(company:companies!inner(id, name, slug, type, logo_url, created_at)),
          developers:game_companies!inner(company:companies!inner(id, name, slug, type, logo_url, created_at))
        `)
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching game:', error);
        throw error;
      }

      if (!data) {
        return null;
      }

      const formattedData = {
        ...data,
        platforms: data.platforms ? data.platforms.map((p: any) => p.platform) : [],
        genres: data.genres ? data.genres.map((g: any) => g.genre) : [],
        publishers: data.publishers ? data.publishers.filter((c: any) => c.company.type === 'publisher').map((c: any) => c.company) : [],
        developers: data.developers ? data.developers.filter((c: any) => c.company.type === 'developer').map((c: any) => c.company) : []
      };

      return formattedData as Game;
    },
  });
};

export const useFeaturedGames = () => {
  return useQuery({
    queryKey: ['featured-games'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('games')
        .select(`
          *,
          platforms:game_platforms(platform:platforms(id, name, slug, logo_url, created_at)),
          genres:game_genres(genre:genres(id, name, slug, created_at)),
          publishers:game_companies!inner(company:companies!inner(id, name, slug, type, logo_url, created_at)),
          developers:game_companies!inner(company:companies!inner(id, name, slug, type, logo_url, created_at))
        `)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching featured games:', error);
        throw error;
      }

      const formattedData = data?.map(game => ({
        ...game,
        platforms: game.platforms ? game.platforms.map((p: any) => p.platform) : [],
        genres: game.genres ? game.genres.map((g: any) => g.genre) : [],
        publishers: game.publishers ? game.publishers.filter((c: any) => c.company.type === 'publisher').map((c: any) => c.company) : [],
        developers: game.developers ? game.developers.filter((c: any) => c.company.type === 'developer').map((c: any) => c.company) : []
      })) || [];

      return formattedData as Game[];
    },
  });
};
