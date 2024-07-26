/* 
Solution:
0. Delimitar el terreno, marcando los espacios exteriores con 'X', para solo operar en
  la forma o shape que nos plantea el problema, los espacios exteriores se
  identifican cuando el shape no es regular, es decir, el shape no siempre tendra
  una forma rectangular, puede ser un tretominio 'L' de tetris, por ejemplo.
  * HINT: Correr un dfs por cada posicion borde en la matriz, es decir el perimetro, marcando
          con 'X' los espacios en blanco, solo se tocan espacios en blanco
  1. Contar cuantas componentes existen, esto se logra
  corriendo un algoritmo de flood-fill pintando las componentes,
  asignandoles una key o color, de modo que podamos identificarlas luego
2. Iterar las componentes y por cada una buscar sus paredes, este algoritmo de
  repuperacion de espacio nos indica cual es el shape de una componente, poniendo
  atencion a que solo las esquinas tiene (+), paredes horizontales tienen solo (-), 
  y paredes verticales tienen solo (|) y entonces podemos agregar este shape
   a la lista de componentes.
3. retornar la lista o array de componentes
*/

var irregularShape = [
  '    +---+',
  '    |   |',
  '+---+   |',
  '|     +-+',
  '|     |  ',
  '|     |  ',
  '+-----+  ',
].join('\n');

var shape = [
  //mxn
  '+---+-+-+---+',
  '|   | | |   |',
  '|   | | |   |',
  '|   | | |   |',
  '+---++++++--+',
  '|    | | |  |',
  '|    | | |  |',
  '+----+-+-+--+',
  '|           |',
  '|     +-----+',
  '+-----+     |',
  '|           |',
  '|           |',
  '+-----------+',
].join('\n');

var shapeTest = [
  '+------------+',
  '|            |',
  '|            |',
  '|            |',
  '+------+-----+',
  '|      |     |',
  '|      |     |',
  '+------+-----+',
].join('\n');

const di = [0, 0, 1, -1, 1, -1, -1, 1];
const dj = [1, -1, 0, 0, 1, -1, 1, -1];

function floodFill(shape, i, j, color) {
  if (i < 0 || i >= shape.length || j < 0 || j >= shape[0].length) return;
  if (shape[i][j] !== ' ') return;
  shape[i][j] = color;
  for (let k = 0; k < 4; ++k) floodFill(shape, i + di[k], j + dj[k], color);
}

function cleanShape(shape, rows, columns) {
  for (let i = 0; i < rows; ++i) {
    if (shape[i][0] === ' ') floodFill(shape, i, 0, 'X');
    if (shape[i][columns - 1] === ' ') floodFill(shape, i, columns - 1, 'X');
  }
  for (let j = 0; j < columns; ++j) {
    if (shape[0][j] === ' ') floodFill(shape, 0, j, 'X');
    if (shape[rows - 1][j] === ' ') floodFill(shape, rows - 1, j, 'X');
  }
}

function getComponens(shape, rows, columns) {
  let counter = 0;
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < columns; ++j) {
      if (shape[i][j] !== ' ') continue;
      ++counter;
      floodFill(shape, i, j, counter.toString());
    }
  }
  return counter;
}

function getShape(shape, rows, columns, color) {
  const getPosition = () => {
    for (let i = 0; i < rows; ++i)
      for (let j = 0; j < columns; ++j)
        if (shape[i][j] === color) return [i, j];
    return [0, 0]; //error
  };
  const [r, c] = getPosition();
  const checkColor = '0';
  const boundList = [];
  let minI = r,
    maxI = r,
    minJ = c,
    maxJ = c;
  const dfs = (i, j) => {
    if (i < 0 || i >= shape.length || j < 0 || j >= shape[0].length) return;
    if (['+', '|', '-'].includes(shape[i][j])) {
      boundList.push([i, j, shape[i][j]]);
      minI = Math.min(minI, i);
      maxI = Math.max(maxI, i);
      minJ = Math.min(minJ, j);
      maxJ = Math.max(maxJ, j);
    }
    if (shape[i][j] !== color) return;
    shape[i][j] = checkColor;
    for (let k = 0; k < 8; ++k) dfs(i + di[k], j + dj[k]);
  };
  dfs(r, c);

  const newShape = Array(maxI - minI + 1)
    .fill()
    .map((row) => Array(maxJ - minJ + 1).fill(' '));
  const newRows = newShape.length;
  const newColumns = newShape[0].length;
  for (const cell of boundList) {
    const [i, j, color] = cell;
    newShape[i - minI][j - minJ] = color;
  }
  //fix + into - or |
  const fix = () => {
    for (let i = 0; i < newRows; ++i)
      for (let j = 0; j < newColumns; ++j) {
        if (newShape[i][j] !== '+') continue;
        if (i - 1 >= 0 && i + 1 < newRows) {
          //vertical |
          if (newShape[i - 1][j] === '|' && newShape[i + 1][j] === '|')
            newShape[i][j] = '|';
          if (newShape[i - 1][j] === '+' && newShape[i + 1][j] === '+')
            newShape[i][j] = '|';
          if (newShape[i - 1][j] === '|' && newShape[i + 1][j] === '+')
            newShape[i][j] = '|';
          if (newShape[i - 1][j] === '+' && newShape[i + 1][j] === '|')
            newShape[i][j] = '|';
        }
        if (j - 1 >= 0 && j + 1 < newColumns) {
          //horizontal -
          if (newShape[i][j - 1] === '-' && newShape[i][j + 1] === '-')
            newShape[i][j] = '-';
          if (newShape[i][j - 1] === '+' && newShape[i][j + 1] === '+')
            newShape[i][j] = '-';
          if (newShape[i][j - 1] === '-' && newShape[i][j + 1] === '+')
            newShape[i][j] = '-';
          if (newShape[i][j - 1] === '+' && newShape[i][j + 1] === '-')
            newShape[i][j] = '-';
        }
      }
  };
  fix(); //several times for ++++
  fix();

  //fix trailing spaces by rows
  for (const row of newShape) {
    let j = newColumns - 1;
    while (j >= 0 && row[j] === ' ') {
      row.pop();
      --j;
    }
  }
  return newShape.map((row) => row.join('')).join('\n');
}

function breakPieces(shape) {
  shape = shape.split('\n').map((row) => row.split(''));
  const rows = shape.length;
  const columns = shape[0].length;
  cleanShape(shape, rows, columns);
  const counterComponents = getComponens(shape, rows, columns);
  //getShape(shape, rows, columns, '4');
  const solution = [];
  for (let color = 1; color <= counterComponents; ++color) {
    solution.push(getShape(shape, rows, columns, color.toString()));
  }
  return solution;
}

//breakPieces(irregularShape);
//breakPieces(shape);
breakPieces(shapeTest);

/* 
                 +--+
                 |  |
                 |  |
+----------------+  |
|                   |
|                   |
+-------------------+
+-------------------+
|                   |
|                   |
|  +----------------+
|  |                 
|  |  trailing spaces not valid answer            
+--+                 


                 +--+
                 |  |
                 |  |
+----------------+  |
|                   |
|                   |
+-------------------+
+-------------------+
|                   |
|                   |
|  +----------------+
|  |
|  |
+--+

not trailing spaces valid solution
*/
