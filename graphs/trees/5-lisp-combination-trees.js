// function Tree(data) {
//   this._root = new Node(data);
// }

// function Node(data) {
//   this.data = data;
//   this.children = [];
// }

function lispTree(c) {
  const findPair = (str, currentPos) => {
    let counter = 0;
    for (let i = currentPos; i < str.length; ++i) {
      if (str[i] === '(') ++counter;
      if (str[i] === ')') {
        --counter;
        if (counter === 0) return i;
      }
    }
  };
  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };
  const dfs = (str) => {
    if (str.match(' ') === null) {
      //its just Number
      return new Node(Number(str));
    }
    const node = new Node(0);
    str = str.slice(0, -1);
    str += ' ';
    const oper = str[1];
    let expr = '';
    for (let i = 3; i < str.length; ++i) {
      if (str[i] === ' ') {
        node.children.push(dfs(expr));
        expr = '';
        continue;
      }
      if (str[i] === '(') {
        const j = findPair(str, i);
        expr = str.slice(i, j + 1);
        node.children.push(dfs(expr));
        i = j + 1;
        expr = '';
        continue;
      }
      expr += str[i];
    }
    const valores = node.children.map((child) => child.data);
    const result = valores.reduce((acc, value) => operations[oper](acc, value));
    node.children.unshift(new Node(oper));
    node.data = result;
    return node;
  };
  const node = dfs(c);
  const tree = new Tree(null);
  tree._root = node;
  return tree;
}
