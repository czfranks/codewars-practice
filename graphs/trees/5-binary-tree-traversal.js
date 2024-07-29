/*
A Node has the following properties:
var data; // A number or string.
Node left; // Undefined if there is no left child.
Node right; // Undefined if there is no right child.
*/

// 1.) Root node, 2.) traverse left subtree, 3.) traverse right subtree.
function preOrder(node) {
  const array = [];
  const dfs = (node) => {
    if (node.left === undefined && node.right == undefined) {
      array.push(node.data);
      return;
    }
    array.push(node.data);
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  };
  dfs(node);
  return array;
}

// 1.) Traverse left subtree, 2.) root node, 3.) traverse right subtree.
function inOrder(node) {
  const array = [];
  const dfs = (node) => {
    if (node.left === undefined && node.right == undefined) {
      array.push(node.data);
      return;
    }
    if (node.left) dfs(node.left);
    array.push(node.data);
    if (node.right) dfs(node.right);
  };
  dfs(node);
  return array;
}

// 1.) Traverse left subtree, 2.) traverse right subtree, 3.) root node.
function postOrder(node) {
  const array = [];
  const dfs = (node) => {
    if (node.left === undefined && node.right == undefined) {
      array.push(node.data);
      return;
    }
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
    array.push(node.data);
  };
  dfs(node);
  return array;
}
