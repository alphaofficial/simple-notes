import { getNotes } from '@/services/notes';
import { NoteInterface } from '@/types/notes.interface';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';

export default function useNotesQuery() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.notes],
    queryFn: getNotes,
  });

  return {
    notes: data as NoteInterface[],
    isLoading,
    isError,
  };
}
