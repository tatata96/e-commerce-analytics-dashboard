export function formatKPIValue(value: number, currency?: string, suffix?: string): string {
  const abs = Math.abs(value);
  let num: string;

  if (abs >= 1_000_000) {
    num = `${(value / 1_000_000).toFixed(1)}m`;
  } else if (abs >= 10_000) {
    num = `${Math.round(value / 1_000)}k`;
  } else if (abs >= 1_000) {
    num = `${(value / 1_000).toFixed(3)}k`;
  } else {
    num = value.toLocaleString();
  }

  if (currency === "USD") {
    return `$${num}`;
  }

  if (suffix) {
    return `${num}${suffix}`;
  }

  return num;
}
