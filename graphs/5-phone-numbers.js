//usando dfs en una estructura de arbol con objetos {}
//se usa como un suffix tree de modo que usar {} como
//estructura de arbol nos permite tener numeros repetidos
//si no comienzan con un especifico digito

function phoneNumber(phoneNumbers) {
  console.log(phoneNumbers);
  const root = {};
  //children as  1: { }, or 2: { 3:{}, 4:{ 5:{} 6:{} } }

  const insert = (num, pos, node) => {
    if (pos === num.length) return;
    if (!node[num[pos]]) node[num[pos]] = {};
    insert(num, pos + 1, node[num[pos]]);
  };

  for (const num of phoneNumbers) {
    insert(num, 0, root);
  }

  console.log(root);

  const dfs = (node) => {
    if (Object.entries(node).length === 0) return 0;
    let counter = 0;
    for (const child in node) {
      counter += 1 + dfs(node[child]);
    }
    return counter;
  };
  return dfs(root);
}
