function checkWord(board, word) {
  const di = [-1, 0, 1, 0, -1, -1, 1, 1];
  const dj = [0, 1, 0, -1, -1, 1, 1, -1];
  const n = board.length;
  let found = false;
  let isVisited;
  function dfs(i, j, currentChr) {
    if (isVisited[i * n + j]) {
      return;
    }
    if (board[i][j] !== word[currentChr]) {
      //no match
      return;
    }
    if (currentChr === word.length - 1) {
      //word found!
      found = true;
      return;
    }
    isVisited[i * n + j] = true;
    for (let k = 0; k < 8; ++k) {
      const ii = i + di[k];
      const jj = j + dj[k];
      if (ii < 0 || ii >= n || jj < 0 || jj >= n) continue;
      dfs(ii, jj, currentChr + 1);
    }
  }

  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      const chr = board[i][j];
      isVisited = Array(n * n).fill(false);
      dfs(i, j, 0);
      if (found) return true;
    }
  }
  return false;
}
