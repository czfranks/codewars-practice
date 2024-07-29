export function allLeavesAtSameLevel(node) {
  if (!node) return true;
  const isLeaf = (node) => {
    return node.getLeft() === undefined && node.getRight() === undefined;
  };
  let deep = null;
  let isSameLevel = true;
  const dfs = (node, level) => {
    if (isLeaf(node)) {
      if (!deep) deep = level;
      if (deep !== level) isSameLevel = false;
    }
    if (node.getRight()) dfs(node.getRight(), level + 1);
    if (node.getLeft()) dfs(node.getLeft(), level + 1);
  };
  dfs(node, 0);
  return isSameLevel;
}
