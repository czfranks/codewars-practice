function blackHole(n, a, b) {
  const board = Array(n)
    .fill()
    .map((row) => Array(n).fill(0));
  let value = 1;
  for (let diag = 0, times = n - 1; diag < n / 2; ++diag, times -= 2) {
    const corneri = [diag, diag, diag + times, diag + times];
    const cornerj = [diag, diag + times, diag + times, diag];
    const di = [0, 1, 0, -1];
    const dj = [1, 0, -1, 0];
    for (let rep = 0, k = 0; rep < times * 4; ++rep, k = (k + 1) % 4) {
      let i = corneri[k] + di[k] * parseInt(rep / 4);
      let j = cornerj[k] + dj[k] * parseInt(rep / 4);
      board[i][j] = value;
      ++value;
    }
  }
  if (n % 2 !== 0) board[parseInt(n / 2)][parseInt(n / 2)] = value;
  console.log(board);
  return board[a][b];
}

console.olblackHole(5, 1, 1);
/* 
i diag                      diag
j diag                      diag + times



i diag + times              diag + times
j diag                      diag + times */
