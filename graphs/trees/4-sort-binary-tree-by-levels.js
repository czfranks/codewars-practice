function treeByLevels(rootNode) {
  if (!rootNode) return [];
  const queue = [];
  const levels = {};
  queue.push([rootNode, 0]);
  while (queue.length > 0) {
    const [node, level] = queue.shift();
    if (!levels[level]) levels[level] = [node.value];
    else levels[level].push(node.value);
    if (node.left) {
      queue.push([node.left, level + 1]);
    }
    if (node.right) {
      queue.push([node.right, level + 1]);
    }
  }
  return Object.entries(levels)
    .map((item) => item[1])
    .flat();
}
