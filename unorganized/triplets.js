const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const toChar = alphabet.split('');
const toInt = {};
toChar.forEach((char, index) => {
  toInt[char] = index;
});
let recoverSecret = (triplets) => {
  let used = Array(26).fill(false);
  let isChild = Array(26).fill(false);
  let graph = Array(26)
    .fill()
    .map(() => []);
  let repeated = Array(26)
    .fill()
    .map(() => Array(26).fill(false));
  let weight = Array(26).fill(0);
  let path = Array(26);

  triplets.forEach((triple) => {
    let [n1, n2, n3] = triple.map((node) => toInt[node]); // n1 -> n2 -> n3
    if (!repeated[n1][n2]) {
      graph[n1].push(n2);
      repeated[n1][n2] = true;
    }
    if (!repeated[n2][n3]) {
      graph[n2].push(n3);
      repeated[n2][n3] = true;
    }
    used[n1] = true;
    used[n2] = true;
    used[n3] = true;
    isChild[n2] = true;
    isChild[n3] = true;
  });

  //no tiene padre
  let begin = used.reduce(
    (_, isUsed, index) => (isUsed && !isChild[index] ? index : _),
    0
  );
  //no tiene hijos
  let goal = graph.reduce(
    (_, isChildList, index) =>
      used[index] && isChildList.length === 0 ? index : _,
    0
  );

  let visited = Array(26).fill(false);
  dfs(graph, weight, path, begin, begin, 1);

  let secret = [goal];
  while (goal != path[goal]) {
    goal = path[goal];
    secret.push(goal);
  }

  return secret
    .reverse()
    .map((x) => toChar[x])
    .join('');
};
function dfs(graph, weight, path, current, parent, w) {
  if (w > weight[current]) {
    weight[current] = w;
    path[current] = parent;
  }
  if (graph[current].length > 0)
    graph[current].forEach((child) => {
      dfs(graph, weight, path, child, current, w + 1);
    });
}
