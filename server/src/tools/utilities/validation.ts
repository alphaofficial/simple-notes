export const isNumberString = (value: string): boolean => {
  return !isNaN(Number(value));
};
