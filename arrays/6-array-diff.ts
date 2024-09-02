export function arrayDiff(a: number[], b: number[]): number[] {
  return a.filter((num) => !b.includes(num));
}
console.log(arrayDiff([1, 2, 3], [1, 2]));
