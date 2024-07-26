//realizando un dfs en un grafo de la siguiente forma
/* 
  {"ADL" : ["MEL"], "MEL" : ["ADL", "SYD"],  "SYD" : ["BRI"], "BRI" : [] }
*/
function checkTrip(start, target, stationLinks) {
  const isVisited = {};
  let hasRoute = false;
  const dfs = (current) => {
    if (current === target) {
      hasRoute = true;
      return;
    }
    if (isVisited[current]) return;
    isVisited[current] = true;
    for (const edge of stationLinks[current]) {
      dfs(edge);
    }
  };
  dfs(start);
  return hasRoute ? 'Possible' : 'Impossible';
}
