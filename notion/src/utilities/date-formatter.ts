import { format, formatDistance, subDays } from 'date-fns';

export const formatDate = (date: string) => {
  const now = new Date();
  return formatDistance(subDays(new Date(date), 0), new Date(), {
    addSuffix: true,
  });
};
