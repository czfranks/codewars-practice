const map1 = [
  ['D', 'P', 'D', 'D', 'D'],
  ['D', 'W', 'D', 'W', 'D'],
  ['D', 'E', 'D', 'E', 'D'],
  ['D', 'W', 'D', 'W', 'D'],
  ['D', 'D', 'D', 'D', 'D'],
];

const map = [
  ['P', 'D', 'D'],
  ['D', 'W', 'D'],
  ['D', 'D', 'D'],
];

var badmap = [
  ['E', 'D', 'D'],
  ['E', 'P', 'D'],
  ['D', 'E', 'D'],
];

function playPacMan(map, position) {
  const di = [1, -1, 0, 0];
  const dj = [0, 0, 1, -1];
  const rows = map.length;
  const columns = map[0].length;
  const id = (i, j) => i * columns + j;
  const coord = [];
  let beans = 0;
  map.forEach((row, i) => {
    row.forEach((elem, j) => {
      beans += elem === 'D' ? 1 : 0;
      coord[id(i, j)] = [i, j];
    });
  });

  //dfs all paths
  const isVisited = {};
  const path = { [id(...position)]: id(...position) };
  let [iLast, jLast] = position;
  let isSolved = false;
  //backtracking
  const dfs = (i, j, parent, beansCount) => {
    if (isSolved) return;
    if (i < 0 || i >= rows || j < 0 || j >= columns) return;
    if (isVisited[id(i, j)]) return;
    if (map[i][j] !== 'D' && map[i][j] !== 'P') return;
    if (beansCount === beans) {
      isSolved = true;
      iLast = i;
      jLast = j;
    }
    isVisited[id(i, j)] = true;
    path[id(i, j)] = parent;
    for (let k = 0; k < 4; ++k) {
      dfs(i + di[k], j + dj[k], id(i, j), beansCount + 1);
    }
    isVisited[id(i, j)] = false; //backtracking
  };

  dfs(...position, id(...position), 0);

  if (!isSolved) return 'no solution';

  //recuperar el camino
  let answer = [];
  let node = id(iLast, jLast);
  while (path[node] !== node) {
    console.log(coord[node]);
    answer.unshift(coord[node]);
    node = path[node];
  }
  answer.unshift(coord[node]);
  return answer;
}

const answer = playPacMan(badmap, [1, 1]);
console.log(answer);
