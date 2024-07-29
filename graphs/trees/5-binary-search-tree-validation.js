class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const isBST = (node) => {
  if (!node) return true;

  const array = [];
  const inOrder = (node) => {
    if (node.left === null && node.right == null) {
      array.push(node.value);
      return;
    }
    if (node.left) inOrder(node.left);
    array.push(node.value);
    if (node.right) inOrder(node.right);
  };
  inOrder(node);
  const isSorted = (fnCompare) => {
    if (array.length <= 1) return true;
    for (let i = 1; i < array.length; ++i) {
      if (!fnCompare(array[i - 1], array[i])) return false;
    }
    return true;
  };
  const asc = isSorted((left, right) => left <= right);
  const desc = isSorted((left, right) => left >= right);
  return asc || desc;
};
