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

export const dateConvert = (dateString: string | null): Date | null => {
  if (!dateString) {
    return null;
  }
  const [day, month, year] = dateString.split("-").map(Number);
  const date: Date = new Date(year, month - 1, day);

  return date;
};

export const maksuMaara = (erapaiva: Date | null): number => {
  let uudetMaksut: number = 0;
  if (erapaiva !== null) {
    const tanaan: Date = new Date();
    const erapaivaDate: Date = new Date(erapaiva)
    const erapaivaTime: number = erapaivaDate.getTime()
    const tanaanTime: number = tanaan.getTime()
    if (erapaivaTime < tanaanTime) {
      const erotus: number = tanaanTime - erapaivaTime;
      const paivat: number = Math.ceil(erotus / (1000 * 3600 * 24)) - 1;
      if (paivat > 20) {
        uudetMaksut += 6;
      } else {
        uudetMaksut += paivat * 0.3;
      }
      return uudetMaksut;
    } else {
      return 0
    }
  } else {
    return 0
  }
};
