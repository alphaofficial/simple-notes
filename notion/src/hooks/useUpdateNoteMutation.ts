import { queryClient } from '@/lib/queryClient';
import { updateNote } from '@/services/notes';
import { UpdateNoteInterface } from '@/types/notes.interface';
import { useMutation } from '@tanstack/react-query';

export default function useUpdateNoteMutation() {
  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNoteInterface }) =>
      updateNote(id, data),
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return mutation;
}
