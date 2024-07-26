var bd = (
  '□□□□□□□□□□□\n' +
  '□□□□□□□□□□□\n' +
  '□□□□□□□□□□□\n' +
  '■■■■■■■■■■■\n' +
  '■■□□■■□□■■■\n' +
  '■■□□■■■□□■■\n' +
  '■■■■■■■■■■■\n' +
  '■■□■■□■■■□■\n' +
  '■□□□■□■■■□■\n' +
  '■■■■■□□■□□■\n' +
  '■□□■■■■■■■■\n' +
  '■□□■■□□□□■■\n' +
  '■■■■■■■■■■■'
)
  .split('\n')
  .map((x) => x.split(''));

var b0 = ('□□\n' + '□□').split('\n').map((x) => x.split(''));

var b1 = ('□□■\n' + '■□□').split('\n').map((x) => x.split(''));

var b2 = ('■□■\n' + '□□□').split('\n').map((x) => x.split(''));

var b3 = ('□□\n' + '□■\n' + '□■').split('\n').map((x) => x.split(''));

//solution

let di = [-1, 0, 1, 0]; //, -1, 1, -1, 1];
let dj = [0, 1, 0, -1]; //, -1, 1, 1, -1];
let rows;
let columns;
const id = (i, j) => i * columns + j;
let isVisited = {};

function dfs(board, i, j) {
  if (i < 0 || i >= rows || j < 0 || j >= columns) return 0;
  if (isVisited[id(i, j)]) return 0;
  if (board[i][j] !== '□') return 0;
  isVisited[id(i, j)] = true;
  let ans = 1;
  for (let k = 0; k < 4; ++k) {
    ans += dfs(board, i + di[k], j + dj[k]);
  }
  return ans;
}

function playtetris(board, block) {
  rows = board.length;
  columns = board[0].length;
  for (let i = 0; i < board.length - block.length; ++i) {
    for (let j = 0; j < board[0].length - block[0].length; ++j) {
      isVisited = {};
      let isMatch = true;
      for (let u = 0; u < block.length; ++u) {
        for (let v = 0; v < block[0].length; ++v) {
          if (board[i + u][j + v] == block[u][v]) continue;
          isMatch = false;
        }
      }
      if (isMatch) {
        let answer = [];
        let have4 = false;
        let once = true;
        for (let u = i; u < block.length + i; ++u) {
          for (let v = j; v < block[0].length + j; ++v) {
            if (board[u][v] === '□') {
              answer.push([u, v]);
              if (once) {
                have4 = dfs(board, u, v);
                once = false;
              }
            }
          }
        }
        answer = JSON.stringify(answer);
        if (have4 === 4) return answer.slice(1, -1);
      }
    }
  }
  return '';
}

const answer = playtetris(bd, b0);
console.log(answer);
