import { getNotes } from '@/services/notes';
import { NoteInterface } from '@/types/notes.interface';
import { useQuery } from '@tanstack/react-query';

export default function useNotesQuery() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  return {
    notes: data as NoteInterface[],
    isLoading,
    isError,
  };
}
