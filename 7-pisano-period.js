function* generatorFib(mod) {
  let a = 0,
    b = 1,
    c;
  yield a;
  yield b;
  while (true) {
    c = (a + b) % mod;
    a = b;
    b = c;
    yield c;
  }
}

function pisano2(n) {
  const fib = generatorFib(n);
  const next = () => {
    return fib.next().value;
  };
  let pattern = [next()];
  let times = 10000;
  while (times--) {
    pattern.push(next());
    if (pattern.length % 2 !== 0) continue;
    if (
      pattern.slice(0, pattern.length / 2).join('') ===
      pattern.slice(pattern.length / 2, pattern.length).join('')
    ) {
      return pattern.length / 2;
    }
  }
  return -1;
}

//console.log(pisano(11));

/* 


0, 1, 1, 2, 0, 2, 2, 1, 0, 1, 1, 2, 0, 2, 2, 1, 0, 1, 1, 2, 0, 2, 2, 1, ... 

0, 1, 1, 2, 0, 2, 2, 1
*/
//    0  1  2  3  4  5  6  7  8
function computePrefixHashes(arr, B = 31, M = 1e9 + 7) {
  const n = arr.length;
  const prefixHashes = new Array(n + 1).fill(0);
  const powerB = new Array(n + 1).fill(1);

  for (let i = 0; i < n; i++) {
    prefixHashes[i + 1] = (prefixHashes[i] * B + arr[i]) % M;
    powerB[i + 1] = (powerB[i] * B) % M;
  }

  return [prefixHashes, powerB];
}

function getSubarrayHash(prefixHashes, powerB, i, j, M = 1e9 + 7) {
  const hashValue =
    (prefixHashes[j + 1] - ((prefixHashes[i] * powerB[j - i + 1]) % M) + M) % M;
  return hashValue;
}

// Ejemplo de uso:
const arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
const [prefixHashes, powerB] = computePrefixHashes(arr);

// Obtener el hash de la submatriz arr[i:j+1]
const i = 2,
  j = 2;
const hashValue = getSubarrayHash(prefixHashes, powerB, i, j);
console.log(`Hash de la submatriz arr[${i}:${j + 1}] es ${hashValue}`);

function pisano(n) {
  const fib = generatorFib(n);
  const next = () => {
    return fib.next().value;
  };
  const arr = Array(1e6);
  for (let i = 0; i < arr.length; ++i) {
    arr[i] = next();
  }
  for (let i = 2; i < 1e5; i += 2) {
    if (arr.slice(0, i / 2).join('') === arr.slice(i / 2, i).join(''))
      return i / 2;
  }
  return -1;
}

console.log(pisano(10));
console.log(pisano(3));
console.log(pisano(4));
