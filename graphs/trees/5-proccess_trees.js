export function Process(pid, children) {
  this.pid = pid;
  this.children = children;
}

export function makeProccessTree(processes) {
  const tree = processes.reduce((tree, node) => {
    const { pid, ppid } = node;
    if (!tree[ppid]) tree[ppid] = [];
    tree[ppid].push(pid);
    return tree;
  }, {});

  const keyRoot = tree['-1'][0];

  const dfs = (node) => {
    const nodeProcess = new Process(node, []);
    if (tree[node]) {
      for (const child of tree[node]) {
        nodeProcess.children.push(dfs(child));
      }
    }
    return nodeProcess;
  };

  const processTree = dfs(keyRoot);

  return processTree;
}

let processes = [
  { pid: 1, ppid: -1 },
  { pid: 219, ppid: 214 },
  { pid: 214, ppid: 1 },
  { pid: 124, ppid: 1 },
];

const processTree = makeProccessTree(processes);
console.log(processTree);
