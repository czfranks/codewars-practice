export function comp(a1: number[] | null, a2: number[] | null): boolean {
  if (a1 === null || a2 === null) return false;
  if (a1.length != a2.length) return false;
  a1.sort((a, b) => a - b);
  a2.sort((a, b) => a - b);
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] ** 2 != a2[i]) return false;
  }
  return true;
}

var a1: number[] = [121, 144, 19, 161, 19, 144, 19, 11];
var a2: number[] = [
  11 * 11,
  121 * 121,
  144 * 144,
  19 * 19,
  161 * 161,
  19 * 19,
  144 * 144,
  19 * 19,
];

console.log(comp(a1, a2));
