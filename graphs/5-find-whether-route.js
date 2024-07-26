//https://www.codewars.com/kata/53897d3187c26d42ac00040d/train/javascript

//usando grafor de la forma
/* 
class Node {
  constructor (value, edges = []) {
    this.value = value;
    this.edges = edges;
  }
}
 */

function getRoute(a, b) {
  const isVisited = {};
  let hasRoute = false;
  const dfs = (current, pathLength) => {
    if (current.value === b.value && pathLength >= 1) {
      hasRoute = true;
      return;
    }
    if (isVisited[current.value]) return;
    isVisited[current.value] = true;
    for (const edge of current.edges) {
      dfs(edge, pathLength + 1);
    }
  };
  dfs(a, 0);

  return hasRoute;
}
