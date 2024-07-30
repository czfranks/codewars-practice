function arrayToTree(array) {
  if (array.length === 0) return undefined;
  const queue = [];
  let pos = 0;
  let len = array.length;
  const root = new TreeNode(array[pos]);
  queue.push(root);
  ++pos;
  while (queue.length > 0) {
    const node = queue.shift();
    if (pos < len) {
      node.left = new TreeNode(array[pos]);
      queue.push(node.left);
      ++pos;
    }
    if (pos < len) {
      node.right = new TreeNode(array[pos]);
      queue.push(node.right);
      ++pos;
    }
  }
  console.log(array);
  return root;
}
