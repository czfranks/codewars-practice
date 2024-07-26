//suma de primeros n numeros de fibonacci

function perimeter(n) {
  if (n == 0) return 4;
  if (n == 1) return 8;
  let a = 1;
  let b = 1;
  let c;
  let sum = 2;
  for (let i = 0; i < n - 1; ++i) {
    c = a + b;
    sum += c;
    a = b;
    b = c;
  }
  return sum * 4;
}
