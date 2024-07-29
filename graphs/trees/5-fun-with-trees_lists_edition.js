function flatten(root) {
  if (!root) return null;
  const norep = new Set();
  const dfs = (node) => {
    let listNode = node.value;
    while (listNode) {
      norep.add(listNode.data);
      listNode = listNode.next;
    }
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  };
  dfs(root);
  const data = [...norep].sort((a, b) => a - b).reverse();
  let nodeList = null;
  for (const value of data) {
    nodeList = new ListNode(value, nodeList);
  }
  return nodeList;
}
