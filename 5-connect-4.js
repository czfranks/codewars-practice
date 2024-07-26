function Connect4() {
  this.rows = 6;
  this.columns = 7;
  this.board = Array(this.rows)
    .fill()
    .map((_) => '       '.split(''));
  this.turn = 1;
  this.di = [1, 1, 1, 0];
  this.dj = [-1, 0, 1, 1];
  this.gameOver = false;

  this.check = function (i, j) {
    let counter, ii, jj;
    for (let k = 0; k < 4; ++k) {
      counter = 0;
      for (let times = 0; times < 4; ++times) {
        ii = i + this.di[k] * times;
        jj = j + this.dj[k] * times;
        if (ii < 0 || ii >= this.rows || jj < 0 || jj >= this.columns) break;
        if (this.board[ii][jj] === this.turn) ++counter;
      }
      if (counter === 4) return true;
    }
    return false;
  };

  this.hasWinner = function () {
    for (let i = 0; i < this.rows; ++i)
      for (let j = 0; j < this.columns; ++j) {
        if (this.check(i, j)) return true;
      }
    return false;
  };
}

Connect4.prototype.play = function (col) {
  this.turn = (this.turn + 1) % 2;
  if (this.gameOver) {
    return 'Game has finished!';
  }
  let top = 0;
  if (this.board[top][col] !== ' ') {
    this.turn = (this.turn + 1) % 2;
    return 'Column full!';
  }
  while (top < this.rows && this.board[top][col] === ' ') ++top;
  --top;
  this.board[top][col] = this.turn;

  if (this.hasWinner()) {
    this.gameOver = true;
    return `Player ${this.turn + 1} wins!`;
  }
  return `Player ${this.turn + 1} has a turn`;
};

const game = new Connect4();
game.play(1);
game.play(1);
game.play(2);
game.play(2);
game.play(3);
game.play(3);
game.play(4);
game.play(4);
