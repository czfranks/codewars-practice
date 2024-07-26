var maze = ['XXXX', 'X XX', 'X TX', 'XXXX'];

function treasure(maze, x, y) {
  maze = maze.map((row) => row.split(''));
  const rows = maze.length;
  const columns = maze[0].length;
  const di = [1, -1, 0, 0];
  const dj = [0, 0, -1, 1];
  let isFound = false;
  let item = null;
  const dfs = (i, j) => {
    if (isFound) return;
    if (i < 0 || i >= rows || j < 0 || j >= columns) return;
    console.log('isX?', i, j, 'maze:', maze[i][j]);
    if (maze[i][j] === 'X') return;
    console.log(i, j, 'maze:', maze[i][j]);
    if (maze[i][j] !== ' ') {
      item = maze[i][j];
      isFound = true;
      return;
    }
    maze[i][j] = 'X';
    for (let k = 0; k < 4; ++k) dfs(i + di[k], j + dj[k]);
  };
  dfs(x - 1, y - 1);
  if (item === null) return 'No treasure found :(';
  return `The treasure is ${item} :)`;
}

console.log(maze.map((row) => row + '\n').join(''));
const answer = treasure(maze, 3, 2);
console.log(answer);
