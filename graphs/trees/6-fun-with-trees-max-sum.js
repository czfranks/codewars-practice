function maxSum(root) {
  if (!root) return 0;
  let maxi = -1e9;
  const dfs = (node, sum) => {
    if (!node.left && !node.right) {
      maxi = Math.max(maxi, sum + node.value);
      return;
    }
    if (node.left) dfs(node.left, sum + node.value);
    if (node.right) dfs(node.right, sum + node.value);
  };
  dfs(root, 0);
  return maxi;
}
