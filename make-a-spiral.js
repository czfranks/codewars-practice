function spiralize(n) {
  const free = 0;
  const busy = 1;
  const wall = 2;
  n = n + 2;
  const spiral = Array(n)
    .fill()
    .map(() => Array(n).fill(free));
  for (let i = 0; i < n; ++i) {
    spiral[0][i] = wall;
    spiral[n - 1][i] = wall;
    spiral[i][0] = wall;
    spiral[i][n - 1] = wall;
  }
  const di = [0, 1, 0, -1];
  const dj = [1, 0, -1, 0];
  let dir = 0;
  let i = 1;
  let j = 1;
  const putWall = (i, j, dir) => {
    if (dir === 0 || dir === 2) {
      if (spiral[i - 1 - di[dir]][j - dj[dir]] !== busy)
        spiral[i - 1 - di[dir]][j - dj[dir]] = wall;
      if (spiral[i + 1 - di[dir]][j - dj[dir]] !== busy)
        spiral[i + 1 - di[dir]][j - dj[dir]] = wall;
    } else {
      if (spiral[i - di[dir]][j - 1 - dj[dir]] !== busy)
        spiral[i - di[dir]][j - 1 - dj[dir]] = wall;
      if (spiral[i - di[dir]][j + 1 - dj[dir]] !== busy)
        spiral[i - di[dir]][j + 1 - dj[dir]] = wall;
    }
  };
  while (true) {
    while (spiral[i][j] !== wall) {
      spiral[i][j] = busy;
      putWall(i, j, dir);
      i += di[dir];
      j += dj[dir];
    }
    i -= di[dir];
    j -= dj[dir];
    dir = (dir + 1) % 4;
    if (spiral[i + di[dir]][j + dj[dir]] === wall) break;
  }
  //console.log(spiral.map((arr) => arr.join('')));
  const answer = spiral
    .slice(1, -1)
    .map((arr) => arr.slice(1, -1))
    .map((arr) => arr.map((cell) => (cell === busy ? cell : free)));

  return answer;
}

const spiral = spiralize(6);
console.log(spiral);
