export * from "./get-date-colors";

export const getDate = (startDate: string, endDate?: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Optional: Use 12-hour format (AM/PM). Set to false for 24-hour.
  };

  const start = new Date(startDate).toLocaleString(undefined, options);

  if (!endDate || startDate === endDate) return start;

  const end = new Date(endDate).toLocaleString(undefined, options);

  return `${start} – ${end}`;
};
