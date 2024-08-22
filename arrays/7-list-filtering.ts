//usando 'any' por input de codewars
export function filter_list(l: Array<any>): Array<number> {
  const filtered: Array<number> = l.filter(
    (item: any): item is number => typeof item === 'number'
  );
  return filtered;
}

const answer: Array<number> = filter_list([1, 2, 'aasf', '1', '123', 123]); // [1, 2, 123]
console.log(answer);
