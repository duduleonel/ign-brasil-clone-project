
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface VisitorSubmission {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author_name: string;
  author_email: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at: string;
  category?: { name: string };
  game?: { title: string };
}

export const useVisitorSubmissions = () => {
  return useQuery({
    queryKey: ['visitor-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('visitor_submissions')
        .select(`
          *,
          category:categories(name),
          game:games(title)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as VisitorSubmission[];
    },
  });
};

export const useUpdateSubmissionStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status, admin_notes }: { id: string; status: string; admin_notes?: string }) => {
      const { error } = await supabase
        .from('visitor_submissions')
        .update({ status, admin_notes })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitor-submissions'] });
    },
  });
};

export const useSubmitPost = () => {
  return useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      excerpt?: string;
      author_name: string;
      author_email: string;
      category_id?: string;
    }) => {
      const { error } = await supabase
        .from('visitor_submissions')
        .insert([data]);
      
      if (error) throw error;
    },
  });
};
