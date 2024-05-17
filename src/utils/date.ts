const DIFFERENCES = {
  month: 2592000000,
  week: 604800000,
  day: 86400000,
  hour: 1000 * 60 * 60,
  minute: 1000 * 60,
};

export function getDifferenceBetweenDates(date1: Date, date2: Date) {
  const difference = date1.getTime() - date2.getTime();
  if (difference < 60000) return "less than a minute";
  for (const [unit, value] of Object.entries(DIFFERENCES)) {
    if (difference > value) {
      const inUnit = Math.floor(difference / value);
      return `${inUnit} ${unit}${inUnit !== 1 ? "s" : ""}`;
    }
  }
  return "Unknown";
}
