
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { VisitorSubmission } from '@/types/database';

export const useVisitorSubmissions = (status?: string) => {
  return useQuery({
    queryKey: ['visitor-submissions', status],
    queryFn: async () => {
      let query = supabase
        .from('visitor_submissions')
        .select(`
          *,
          category:categories(id, name, slug),
          game:games(id, title, slug)
        `)
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching visitor submissions:', error);
        throw error;
      }

      return data as VisitorSubmission[];
    },
  });
};

export const useCreateVisitorSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (submission: Omit<VisitorSubmission, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('visitor_submissions')
        .insert([submission])
        .select()
        .single();

      if (error) {
        console.error('Error creating visitor submission:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitor-submissions'] });
    },
  });
};

export const useUpdateVisitorSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<VisitorSubmission>) => {
      const { data, error } = await supabase
        .from('visitor_submissions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating visitor submission:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitor-submissions'] });
    },
  });
};
