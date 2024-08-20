const getNumberLetter = (s) => {
  let num = 0;
  let letter;
  for (let i = 0; i < s.length; ++i) {
    if ('0123456789'.includes(s[i])) num = num * 10 + Number(s[i]);
    else letter = s[i];
  }
  return [num, letter];
};

export const doMath = (string) => {
  const data = [];
  const numbers = string.split(' ');
  for (let i = 0; i < numbers.length; ++i) {
    const numberStr = numbers[i];
    const [num, letter] = getNumberLetter(numberStr);
    data.push([num, letter, i]);
  }
  data.sort((item1, item2) => {
    const [, letter1, pos1] = item1;
    const [, letter2, pos2] = item2;
    if (letter1 < letter2) return -1;
    if (letter1 === letter2) return pos1 - pos2;
    return 1;
  });
  const justNumbers = data.map((item) => item[0]);
  const operations = [
    (a, b) => a + b,
    (a, b) => a - b,
    (a, b) => a * b,
    (a, b) => a / b,
  ];
  let oper = 0;
  let ans = justNumbers[0];
  for (let i = 1; i < justNumbers.length; ++i) {
    ans = operations[oper](ans, justNumbers[i]);
    oper = (oper + 1) % 4;
  }
  return Math.round(ans);
};

const answer = doMath('24z6 1z23 y369 89z 900b');
console.log(answer);
