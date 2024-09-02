export function inArray(a1: string[], a2: string[]): string[] {
  const substrings = a1.filter((pattern) =>
    a2.some((word) => word.includes(pattern))
  );
  substrings.sort();
  return substrings;
}
