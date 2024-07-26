function middlePermutation(s) {
  s = s.split('').sort().join('');
  const n = 26n;
  const factorial = Array(n).fill(1n);
  for (let i = 1n; i <= n; ++i) {
    factorial[i] = factorial[i - 1n] * i;
  }
  const middle = factorial[s.length] / 2n;
  const answer = [];
  const ithPermutation = (ith) => {
    console.log(s, ith);
    if (s.length === 1) return s;
    const fact = factorial[s.length - 1];
    const pos = ith / fact;
    const choice = s[pos];
    s = s.slice(0, Number(pos)) + s.slice(Number(pos) + 1);
    return [choice].concat(ithPermutation(ith % fact));
  };
  return ithPermutation(middle - 1n).join('');
}
middlePermutation('aqdfnpkbwojczygumvhsxlrtie'.split('').sort().join(''));
