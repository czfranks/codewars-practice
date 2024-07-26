const map = [
  ['P', 'E', 'E'],
  ['E', 'W', 'E'],
  ['E', 'E', 'X'],
];

var map2 = [
  ['E', 'P', 'E', 'D'],
  ['E', 'W', 'E', 'L'],
  ['E', 'E', 'R', 'X'],
];

const getPosition = (map) => {
  for (let i = 0; i < map.length; ++i) {
    let j = map[i].indexOf('P');
    if (j === -1) continue;
    return [i, j];
  }
  return [0, 0];
};
//          R  B  L   U
const di = [0, 1, 0, -1];
const dj = [1, 0, -1, 0];

function playPacMan(map) {
  let [i, j] = getPosition(map);
  const rows = map.length;
  const columns = map[0].length;
  const isVisited = {};
  const id = (i, j, dir) => `${i},${j},${dir}`;
  let dir = 0; //going to the right
  const inMap = (i, j) => i >= 0 && i < rows && j >= 0 && j < columns;
  const isWall = (i, j) => !inMap(i, j) || map[i][j] === 'W';
  let isStopped = false;
  //cambiar la direccion de pacman cuando se topa con una pared
  const changeDir = () => {
    const currentDir = dir;
    while (isWall(i + di[dir], j + dj[dir])) {
      dir = (dir + 1) % 4;
      if (dir === currentDir) {
        isStopped = true;
        break;
      }
    }
    return dir;
  };
  //recorrido normal de pacman
  while (true) {
    if (isVisited[id(i, j, dir)]) {
      return false;
    }
    isVisited[id(i, j, dir)] = true;
    if (map[i][j] === 'X') {
      return true;
    }
    if (map[i][j] === 'R') dir = 0;
    if (map[i][j] === 'D') dir = 1;
    if (map[i][j] === 'L') dir = 2;
    if (map[i][j] === 'U') dir = 3;
    if (isWall(i + di[dir], j + dj[dir])) {
      changeDir(i, j);
    }
    if (isStopped) return false;
    i += di[dir];
    j += dj[dir];
  }
  return false;
}
const answer = playPacMan([
  //0    1    2    3    4
  ['E', 'E', 'U', 'U', 'X'], //0
  ['E', 'W', 'L', 'W', 'R'], //1
  ['D', 'P', 'E', 'E', 'R'], //2
]);
console.log(answer);
