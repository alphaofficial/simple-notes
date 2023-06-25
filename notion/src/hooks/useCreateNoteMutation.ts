import { queryClient } from '@/lib/queryClient';
import { createNote, updateNote } from '@/services/notes';
import { CreateNoteInterface, NoteInterface } from '@/types/notes.interface';
import { useMutation } from '@tanstack/react-query';

export default function useCreateNoteMutation() {
  const mutation = useMutation({
    mutationFn: (data: CreateNoteInterface) => createNote(data),
    onMutate: async (newNote) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['notes'] });

      // Snapshot the previous value
      const previousNotes = queryClient.getQueryData(['notes']);

      // Optimistically update to the new value
      queryClient.setQueryData(['notes'], (old) => [...(old as any), newNote]);

      // Return a context object with the snapshotted value
      return { previousNotes };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newNote, context) => {
      queryClient.setQueryData(['notes'], context?.previousNotes);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return mutation;
}
