import useSWR from 'swr';
import { QUERY_KEYS } from './queryKeys';
import { getNotes } from '@/services/notes';

export default function useNotes() {
  const { data, error, isLoading, mutate } = useSWR(QUERY_KEYS.notes, getNotes);
  const refetch = async () => await mutate(getNotes());

  const favorites = data?.filter((note) => note.isFavorite);
  const nonFavorites = data?.filter((note) => !note.isFavorite);

  return {
    notes: nonFavorites,
    favorites,
    error,
    isLoading,
    refetch,
    update: mutate,
  };
}
