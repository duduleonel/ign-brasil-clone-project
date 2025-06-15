
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Company } from '@/types/database';

export const useCompanies = (type?: 'publisher' | 'developer') => {
  return useQuery({
    queryKey: ['companies', type],
    queryFn: async () => {
      let query = supabase
        .from('companies')
        .select('*')
        .order('name', { ascending: true });

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching companies:', error);
        throw error;
      }

      return data as Company[];
    },
  });
};

export const usePublishers = () => {
  return useCompanies('publisher');
};

export const useDevelopers = () => {
  return useCompanies('developer');
};

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('genres')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching genres:', error);
        throw error;
      }

      return data;
    },
  });
};

export const usePlatforms = () => {
  return useQuery({
    queryKey: ['platforms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('platforms')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching platforms:', error);
        throw error;
      }

      return data;
    },
  });
};
