export function isValidTree(tree) {
  if (tree.ornament != 'star') return false;
  const isLeaf = (node) => {
    return node.left === undefined && node.right === undefined;
  };
  const dfs = (node, deep) => {
    let isValid = true;
    if (deep > 0) {
      if (isLeaf(node)) {
        isValid = node.color === 'blue';
      } else {
        isValid = node.color === 'red';
      }
    }
    if (node.left) isValid &&= dfs(node.left, deep + 1);
    if (node.right) isValid &&= dfs(node.right, deep + 1);

    return isValid;
  };

  return dfs(tree, 0);
}

const answer2 = isValidTree({
  ornament: 'star',
  color: 'yellow',
  left: {
    ornament: 'candy cane',
    color: 'red',
    left: { ornament: 'snowman', color: 'blue' },
    right: { ornament: 'ball', color: 'blue' },
  },
  right: {
    ornament: 'stocking',
    color: 'red',
    left: { ornament: 'sled', color: 'blue' },
  },
});

console.log(answer2);
