export function mix(s1, s2) {
  const getFequency = (s) => {
    const freq = {};
    for (const chr of s) {
      if (!/[a-z]/.test(chr)) continue;
      freq[chr] = freq[chr] + 1 || 1;
    }
    return freq;
  };

  const freq1 = getFequency(s1);
  const freq2 = getFequency(s2);
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const arr = [];
  for (const letter of letters) {
    if (!freq1[letter]) freq1[letter] = 1;
    if (!freq2[letter]) freq2[letter] = 1;
    const f1 = freq1[letter];
    const f2 = freq2[letter];
    const maxi = Math.max(f1, f2);
    if (maxi === 1) continue;
    if (f1 === f2) {
      arr.push(`=:${letter.repeat(f1)}`);
      continue;
    }
    arr.push(`${maxi === f1 ? 1 : 2}:${letter.repeat(maxi)}`);
  }
  return arr
    .sort((sub1, sub2) => {
      if (sub2.length === sub1.length) {
        return sub1 < sub2 ? -1 : 1;
      }
      return sub2.length - sub1.length;
    })
    .join('/');
}
const s1 = 'my&friend&Paul has heavy hats! &';
const s2 = 'my friend John has many many friends &';
const ans = mix(s1, s2);
console.log(ans);
