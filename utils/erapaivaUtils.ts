export const haeEraPaiva = (paivat: number): string => {
  let paiva: Date = new Date();
  paiva.setDate(paiva.getDate() + paivat);

  const formattedDate = `${paiva.getDate().toString().padStart(2, "0")}-${(
    paiva.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${paiva.getFullYear()}`;

  return formattedDate;
};

export const isLate = (date: Date | null): boolean => {
  if (!date) {
    return false;
  }
  const currentDate = new Date();
  const targetDate = new Date(date);
  return targetDate < currentDate;
};

export const dateConvert = (dateString: string | null): Date |null => {
  if (!dateString) {
    return null;
  }
  const [day, month, year] = dateString.split("-").map(Number);
  const date: Date = new Date(year, month - 1, day);

  return date;

};
