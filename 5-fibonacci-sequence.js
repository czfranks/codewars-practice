function* fibonacciSequence() {
  yield 1;
  yield 1;
  let a = 1,
    b = 1,
    c;
  while (true) {
    c = a + b;
    a = b;
    b = c;
    yield c;
  }
}
