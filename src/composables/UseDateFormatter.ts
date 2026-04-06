const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
export function useDateFormatter() {
  const toDayMonthYear = (dateString: string | undefined | null): string => {
    if (!dateString) return "-";
    const parts = dateString.split("-");
    if (parts.length !== 3) return dateString;
    const [year, month, day] = parts;
    return `${day}-${month}-${year}`;
  };

  const toFullDate = (dateString: string | undefined | null): string => {
    if (!dateString) return "-";
    const parts = dateString.split("-");
    if (parts.length !== 3) return dateString;
    const [year, month, day] = parts;
    const monthIndex = parseInt(month, 10) - 1;
    if (monthIndex < 0 || monthIndex > 11) return dateString;
    return `${parseInt(day, 10)} ${MONTHS[monthIndex]} ${year}`;
  };

  return {
    toDayMonthYear,
    toFullDate,
  };
}
