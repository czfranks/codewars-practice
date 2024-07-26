/*
  AVANCE: 
  * YA TENGO EL GRAFO EN LA VARIABLE 'graph' este grafo
    conecta las 'bulbs' "en 4 direcciones, "sin levantar el lapiz" "
  * El array coord  sirve para obtener las coordenadas
    de id(i,j) o el id de las coordenadas i, j
  * La funcion id(i,j) me devuelve el id de una coordenada i,j

  *posible solucion: Complete Search + Backtraking en cada nodo,
    es una solucion ultra fuerza bruta, con mas calma y mas conocimiento
    si lo puedo resolver

*/

//012345678910
const gameMap = `+---------+
|.........|
|...BBB...|
|..B...B..|
|......B..|
|.....B...|
|....B....|
|....B....|
|.........|
|....B....|
|.........|
+---------+`;

let rows, columns;
const id = (i, j) => i * columns + j;

const getGraph = (gameMap) => {
  const board = gameMap.split('\n').map((row) => row.split(''));
  const coord = [];
  let maxId = 0;
  rows = board.length;
  columns = board[0].length;
  //reconocimiento para saber cuantos B's hay
  board.forEach((row, i) => {
    row.forEach((elem, j) => {
      if (elem === 'B') {
        coord[id(i, j)] = [i, j];
        maxId = Math.max(maxId, id(i, j));
      }
    });
  });
  //creando grafo con maxId como maximo indice
  const graph = Array(maxId + 1)
    .fill()
    .map(() => []);
  //recorrer el 'board', y vamos a crear el 'graph'
  buildThisGraph(graph, board);
  printGraph(graph, coord);
};

getGraph(gameMap);

//helper functions
function buildThisGraph(graph, board) {
  //creando funcion enlazadora para un par de 'bulbs' nodos
  const link = (ui, uj, vi, vj) => {
    const u = id(ui, uj); //nodo u
    const v = id(vi, vj); //nodo v
    graph[u].push(v);
    graph[v].push(u);
  };
  //explorando grafo
  const di = [0, 1, 1, 1];
  const dj = [1, 1, 0, -1];
  let ui, uj; //enlazamos 'u' con 'v'
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < columns; ++j) {
      if (board[i][j] !== 'B') continue;
      for (let k = 0; k < 4; ++k) {
        ui = i;
        uj = j;
        let vi = ui + di[k];
        let vj = uj + dj[k];
        while (vi < rows && vj < columns && vj >= 0) {
          if (board[vi][vj] === 'B') {
            link(ui, uj, vi, vj);
            ui = vi;
            uj = vj;
          }
          //console.log(vi, vj);
          vi = vi + di[k];
          vj = vj + dj[k];
        }
      }
    }
  }
  //borrar repetidos
  for (let i = 0; i < graph.length; ++i) {
    graph[i] = Array.from(new Set(graph[i]));
  }
}

function printGraph(graph, coord) {
  for (let i = 0; i < graph.length; ++i) {
    if (graph[i].length === 0) continue;
    let adj = '';
    for (const row of graph[i]) {
      adj += `(${coord[row][0]},${coord[row][1]}) `;
    }
    console.log(`nodo: (${coord[i]}) -> ${adj}`);
  }
}
