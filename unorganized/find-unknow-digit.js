const operation = {
  '+': (l, r) => l + r,
  '-': (l, r) => l - r,
  '*': (l, r) => l * r,
};

function configRune(string, rune) {
  return string
    .split('')
    .map((chr) => (chr === '?' ? rune.toString() : chr))
    .join('');
}

function splitBody(string) {
  let opIndex = 0;
  for (const i in string) {
    const chr = string[i];
    if ((chr === '-' || chr === '+' || chr === '*') && i > 0) {
      opIndex = i;
      break;
    }
  }
  opIndex = Number(opIndex);
  const left = string.slice(0, opIndex);
  const right = string.slice(opIndex + 1);
  return [left, right, string[opIndex]];
}

function isValidExpression(string) {
  return !(
    string.length > 1 &&
    (string[0] === '0' || (string[0] === '-' && string[1] === '0'))
  );
}

function solveExpression(exp) {
  const equalIndex = exp.search('=');
  const bodyBase = exp.slice(0, equalIndex);
  const totalBase = exp.slice(equalIndex + 1);
  let valid = false;
  let rune;
  for (let i = 0; i <= 9; ++i) {
    const body = configRune(bodyBase, i);
    const total = configRune(totalBase, i);
    const [left, right, op] = splitBody(body);
    if (exp.search(i.toString()) !== -1) {
      continue;
    }
    if (
      !isValidExpression(left) ||
      !isValidExpression(right) ||
      !isValidExpression(total)
    )
      continue;
    const result = operation[op](Number(left), Number(right));
    if (result === Number(total)) {
      valid = true;
      rune = i;
      break;
    }
  }
  return valid ? rune : -1;
}
