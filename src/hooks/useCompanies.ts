
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Temporary mock data since companies table doesn't exist
const mockCompanies = [
  {
    id: '1',
    name: 'Team Z2',
    slug: 'team-z2',
    type: 'developer' as const,
    logo_url: null,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Elecbyte',
    slug: 'elecbyte',
    type: 'developer' as const,
    logo_url: null,
    created_at: new Date().toISOString(),
  }
] as const;

const mockGenres = [
  { id: '1', name: 'Luta', slug: 'luta', created_at: new Date().toISOString() },
  { id: '2', name: 'Beat em Up', slug: 'beat-em-up', created_at: new Date().toISOString() },
  { id: '3', name: 'Plataforma', slug: 'plataforma', created_at: new Date().toISOString() }
];

const mockPlatforms = [
  { id: '1', name: 'Windows', slug: 'windows', logo_url: null, created_at: new Date().toISOString() },
  { id: '2', name: 'Linux', slug: 'linux', logo_url: null, created_at: new Date().toISOString() },
  { id: '3', name: 'Mac', slug: 'mac', logo_url: null, created_at: new Date().toISOString() }
];

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      // Return mock data since the table doesn't exist
      return mockCompanies;
    },
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      // Return mock data since the table doesn't exist  
      return mockGenres;
    },
  });
};

export const usePlatforms = () => {
  return useQuery({
    queryKey: ['platforms'],
    queryFn: async () => {
      // Return mock data since the table doesn't exist
      return mockPlatforms;
    },
  });
};
