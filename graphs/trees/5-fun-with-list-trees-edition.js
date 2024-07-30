// function ListNode(data, next = null) {
//   this.data = data;
//   this.next = next;
// };

// function TreeNode(value, left, right) {
//   this.value = value;
//   this.left = left;
//   this.right = right;
// };
function flatten(head) {
  if (!head) return null;
  const numbers = new Set();
  const dfs = (node) => {
    console.log(node);
    numbers.add(node.value);
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  };
  while (head) {
    dfs(head.data);
    head = head.next;
  }
  console.log(numbers);

  const sorted = [...numbers].sort((a, b) => a - b);
  const len = sorted.length;
  const queue = [];
  let pos = 0;
  const root = new TreeNode(sorted[pos]);
  queue.push(root);
  ++pos;
  while (queue.length > 0) {
    const node = queue.shift();
    if (pos < len) {
      node.left = new TreeNode(sorted[pos]);
      queue.push(node.left);
      ++pos;
    }
    if (pos < len) {
      node.right = new TreeNode(sorted[pos]);
      queue.push(node.right);
      ++pos;
    }
  }
  return root;
}
