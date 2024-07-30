/* preloaded Node definition :
class Node {
  constructor (data, children = []) {
    this.data = data;
    this.children = children;
  }
}
*/

function treeToArray(tree) {
  if (tree.length === 0) return [];
  const levels = {};
  const dfs = (node, level) => {
    if (!levels[level]) levels[level] = [node.data];
    else levels[level].push(node.data);
    for (const child of node.children) {
      dfs(child, level + 1);
    }
  };
  dfs(tree, 0);
  const list = [];
  for (const key in levels) {
    list.push(...levels[key]);
  }
  return list;
}
