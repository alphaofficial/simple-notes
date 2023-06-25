import { queryClient } from '@/lib/queryClient';
import { createNote, updateNote } from '@/services/notes';
import { CreateNoteInterface, NoteInterface } from '@/types/notes.interface';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';

export default function useCreateNoteMutation() {
  const mutation = useMutation({
    mutationFn: (data: CreateNoteInterface) => createNote(data),
    onMutate: async (newNote) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.notes] });
      const previousNotes = queryClient.getQueryData([QUERY_KEYS.notes]);
      queryClient.setQueryData([QUERY_KEYS.notes], (old) => [
        ...((old as NoteInterface[]) ?? []),
        newNote,
      ]);
      return { previousNotes };
    },
    onError: (err, newNote, context) => {
      queryClient.setQueryData([QUERY_KEYS.notes], context?.previousNotes);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.notes] });
    },
  });

  return mutation;
}
