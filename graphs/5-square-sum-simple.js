const isSquare = (x) => {
  return Math.sqrt(x) % 1 === 0;
};

const createGraph = (n) => {
  const graph = Array(n + 1)
    .fill()
    .map(() => []);
  for (let i = 1; i <= n; ++i) {
    for (let j = i + 1; j <= n; ++j) {
      if (isSquare(i + j)) {
        graph[i].push(j);
        graph[j].push(i);
      }
    }
  }
  return graph;
};

export const print = (graph) => {
  for (let i = 0; i < graph.length; ++i) {
    console.log(i, '->', JSON.stringify(graph[i]));
  }
};

let finished;
let path;
const dfs = (graph, visited, u, deep) => {
  if (finished) return;
  visited[u] = true;
  path.push(u);
  if (deep === graph.length - 1) {
    finished = true;
    return;
  }
  for (let v of graph[u]) {
    if (!visited[v]) {
      dfs(graph, visited, v, deep + 1);
    }
  }
  if (finished) return;
  path.pop();
  visited[u] = false;
};

export function square_sums_row(n) {
  const graph = createGraph(n);
  finished = false;
  for (let i = 1; i <= n; ++i) {
    path = [];
    dfs(graph, Array(n + 1).fill(false), i, 1);
    for (let j = 1; j < path.length; ++j) {
      if (isSquare(path[j] + path[j - 1])) continue;
      finished = false;
    }
    if (finished) break;
  }
  return finished ? path : false;
}

const answer = square_sums_row(50);
console.log(answer);
