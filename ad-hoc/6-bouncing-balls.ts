export function bouncingBall(
  h: number,
  bounce: number,
  window: number
): number {
  if (window >= h || bounce <= 0 || bounce >= 1) {
    return -1;
  }
  let count = 1;
  h *= bounce;
  while (h > window) {
    h *= bounce;
    count += 2;
  }
  return count;
}
