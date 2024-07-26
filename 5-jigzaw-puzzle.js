const suffle = [
  { top: false, left: '4', right: false, bottom: 'e' },
  { top: 'q', left: '17', right: '18', bottom: false },
  { top: 'c', left: '6', right: '7', bottom: 'h' },
  { top: false, left: false, right: '1', bottom: 'a' },
  { top: 'j', left: '12', right: false, bottom: 'o' },
  { top: 'k', left: false, right: '13', bottom: 'p' },
  { top: 'o', left: '16', right: false, bottom: 't' },
  { top: 'm', left: '14', right: '15', bottom: 'r' },
  { top: false, left: '3', right: '4', bottom: 'd' },
  { top: 'f', left: false, right: '9', bottom: 'k' },
  { top: 'd', left: '7', right: '8', bottom: 'i' },
  { top: 'r', left: '18', right: '19', bottom: false },
  { top: 'b', left: '5', right: '6', bottom: 'g' },
  { top: 'g', left: '9', right: '10', bottom: 'l' },
  { top: false, left: '2', right: '3', bottom: 'c' },
  { top: false, left: '1', right: '2', bottom: 'b' },
  { top: 's', left: '19', right: '20', bottom: false },
  { top: 't', left: '20', right: false, bottom: false },
  { top: 'e', left: '8', right: false, bottom: 'j' },
  { top: 'i', left: '11', right: '12', bottom: 'n' },
  { top: 'l', left: '13', right: '14', bottom: 'q' },
  { top: 'p', left: false, right: '17', bottom: false },
  { top: 'a', left: false, right: '5', bottom: 'f' },
  { top: 'h', left: '10', right: '11', bottom: 'm' },
  { top: 'n', left: '15', right: '16', bottom: 's' },
];
function assemblePuzzle(pieces) {
  console.log(pieces);
  const customCount = (property) =>
    pieces.reduce(
      (counter, piece) => (counter += piece[property] === false ? 1 : 0),
      0
    );
  const rows = customCount('right');
  const columns = customCount('bottom');

  const board = Array(rows)
    .fill()
    .map((_) => Array(columns).fill(null));

  let current = pieces.find(
    (piece) => piece.top === false && piece.left === false
  );
  let iterator;
  let i = 0,
    j = 0;
  while (true) {
    iterator = { ...current };
    while (true) {
      board[i][j] = { ...iterator };
      if (iterator.right === false) break;
      iterator = pieces.find((next) => next.left === iterator.right);
      ++j;
    }
    if (current.left === false && current.bottom === false) break;
    ++i;
    j = 0;
    current = pieces.find((next) => next.top === current.bottom);
  }
  return board;
}
assemblePuzzle(suffle);
