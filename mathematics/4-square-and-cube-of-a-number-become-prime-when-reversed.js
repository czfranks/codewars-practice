const primes = [];
let isPrime = [];
export const criba = (limit) => {
  const N = limit + 1;
  isPrime = Array(N).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;
  primes.push(2);
  for (let i = 4; i < N; i += 2) isPrime[i] = false;
  for (let i = 3; i < N; i += 2) {
    if (!isPrime[i]) continue;
    primes.push(i);
    for (let j = 2 * i; j < N; j += i) {
      isPrime[j] = false;
    }
  }
};

export const checkPrime = (x) => {
  if (x <= isPrime.length - 1) {
    return isPrime[x];
  }
  const limit = Math.sqrt(x);
  for (let i = 0; i < primes.length; ++i) {
    if (primes[i] > limit) break;
    if (x % primes[i] === 0) return false;
  }
  return true;
};

export const reverse = (x) => {
  let sq10 = Math.pow(10, parseInt(Math.log10(x)));
  let r = 0;
  while (x > 0) {
    r += (x % 10) * sq10;
    x = parseInt(x / 10);
    sq10 /= 10;
  }
  return r;
  //return Number(x.toString().split('').reverse().join(''));
};

const memo = Array(251).fill(0);
export const squareCubes = (limit) => {
  memo[1] = 89;
  let sq, cub;
  for (let nth = 2; nth <= limit; ++nth) {
    for (let i = memo[nth - 1] + 1; ; ++i) {
      sq = reverse(i * i);
      cub = reverse(i * i * i);
      if (checkPrime(sq) && checkPrime(cub)) {
        memo[nth] = i;
        break;
      }
    }
  }
};

criba(1e7 + 19);
squareCubes(250);
console.log(`[${memo.join(',')}]`);
for (let i = 1; i < memo.length; i++) {
  console.log(memo[i] - memo[i - 1]);
}
