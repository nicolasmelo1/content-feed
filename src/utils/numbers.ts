export function formatNumberIntoReadableString(num: number): string {
  const absNum = Math.abs(num);
  if (absNum === 0) return "0";
  if (absNum >= 1000000000)
    return `${(absNum / 1000000000).toFixed(1).replace(/\.0/g, "")}B`;
  if (absNum >= 1000000)
    return `${(absNum / 1000000).toFixed(1).replace(/\.0/g, "")}M`;
  if (absNum >= 1000)
    return `${(absNum / 1000).toFixed(1).replace(/\.0/g, "")}K`;
  return num.toString();
}
