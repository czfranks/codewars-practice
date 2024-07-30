// Instructions are in description.
// Make sure you are counting the first level (root) as
// being read from left to right.
function serpentineTree(node) {
  console.log(node);
  const levels = {};
  const dfs = (node, level) => {
    if (!levels[level]) levels[level] = [node.data];
    else levels[level].push(node.data);
    if (node.left) dfs(node.left, level + 1);
    if (node.right) dfs(node.right, level + 1);
  };
  dfs(node, 0);
  const serpentine = [];
  for (const key in levels) {
    if (Number(key) % 2 === 0) {
      serpentine.push(...levels[key]);
    } else {
      serpentine.push(...levels[key].reverse());
    }
  }
  return serpentine;
}
