import { formatDistance, subDays } from 'date-fns';

export const formatDate = (date: string) => {
  return formatDistance(subDays(new Date(date), 0), new Date(), {
    addSuffix: true,
  });
};
