function freakContazSequence(s) {
  if (s === 'U') return 4;
  const sOriginal = new String(s);
  const op = {
    D: (n) => n * 3,
    U: (n) => (3 * n - 2) / 4,
    d: (n) => (3 * n + 1) / 2,
  };
  const jump = {
    D: 1,
    U: 4,
    d: 2,
  };
  const begin = {
    D: 1,
    U: 2,
    d: 1,
  };
  s = s.split('').reverse().join('');
  for (let i = begin[s[0]]; true; i += jump[s[0]]) {
    let n = i;
    //if (i === 10 || 1) console.log('Comienza con i=', n);
    let isBreak = false;
    for (const c of s) {
      n = op[c](n);
      //if (i === 10 || 1) console.log(`'aplicado ${c}:'`, n);
      if (n !== parseInt(n)) {
        isBreak = true;
        break;
      }
    }
    ////console.log(i, n);
    if (n === parseInt(n) && !isBreak) {
      if (sequence(n, sOriginal, i)) {
        return n;
      }
    }
  }
}

function sequence(n, seq, ans) {
  const op = {
    D: () => n / 3,
    U: () => (4 * n + 2) / 3,
    d: () => (2 * n - 1) / 3,
  };
  seq = seq.split('');
  let count = 0;
  for (const c of seq) {
    n = op[c]();
    if (n !== parseInt(n)) break;
    count++;
    if (n === 1) break;
  }

  if (count === seq.length) return n === ans;
  return false;
}
