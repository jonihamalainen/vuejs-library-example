export const haeEraPaiva =  (paivat: number): string => {
  let paiva: Date = new Date();
  paiva.setDate(paiva.getDate() + paivat);

  const formattedDate = `${paiva.getDate().toString().padStart(2, "0")}-${(paiva.getMonth() + 1).toString().padStart(2, "0")}-${paiva.getFullYear()}`;

  return formattedDate;
};
