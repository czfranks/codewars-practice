type Frequency = {
  [k: number]: number;
};

export const findOdd = (xs: number[]): number => {
  const frequency: Frequency = {};
  for (const num of xs) {
    frequency[num] = 1 + (frequency[num] || 0);
  }
  const answer = Object.entries(frequency).find(
    ([_key, value]) => value % 2 !== 0
  );

  if (!answer || answer.length != 2) return 0;
  return +answer[0];
};

const answer: number = findOdd([
  20, 1, -1, 2, -2, 3, 3, 5, 5, 1, 2, 4, 20, 4, -1, -2, 5,
]);
console.log(answer);
