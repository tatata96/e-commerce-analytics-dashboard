export function cssVar(name: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const ref = value.match(/^var\(([^,)]+)/);
  return ref ? cssVar(ref[1].trim()) : value;
}
