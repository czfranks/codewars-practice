function preProcess(expr) {
  return expr
    .trim()
    .split(' ')
    .join('')
    .replaceAll('++', '+')
    .replaceAll('-+', '-')
    .replaceAll('+-', '-')
    .replaceAll('--', '+');
}

//tokenize expression wihout parentesses
function getTokens(cleanExpr) {
  const tokens = [];
  const len = cleanExpr.length;
  for (let i = 0; i < len; ++i) {
    if ('0123456789.-+'.includes(cleanExpr[i])) {
      let strNumber = cleanExpr[i];
      ++i;
      while (i < len && '0123456789.'.includes(cleanExpr[i])) {
        strNumber += cleanExpr[i];
        ++i;
      }
      --i;
      //add token
      tokens.push(strNumber);
      continue;
    }
    tokens.push(cleanExpr[i]);
  }
  return tokens;
}

//evaluate clean Expression wihout parentesses
function evaluate(cleanExpr) {
  const tokens = getTokens(cleanExpr);
  const addends = [];
  const op = {
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };
  while (tokens.length > 0) {
    const current = tokens.shift();
    if (current === '*' || current === '/') {
      const left = addends.pop();
      const right = tokens.shift();
      addends.push(op[current](left, Number(right)));
      continue;
    }
    addends.push(Number(current));
  }
  const ans = addends.reduce((acc, curr) => acc + curr);
  return ans;
}

const calc = function (expr) {
  expr = `(${preProcess(expr)})`;
  let right, left;
  while ((right = expr.indexOf(')')) !== -1) {
    left = right;
    while (expr[left] !== '(') --left;
    const leftExpr = expr.slice(0, left);
    const cleanExpr = expr.slice(left + 1, right);
    const rightExpr = expr.slice(right + 1);
    expr = leftExpr;
    if (cleanExpr[0] !== '(')
      //miss ((((2+3)))) => 2+3
      expr += evaluate(preProcess(cleanExpr)).toString();
    expr += rightExpr;
  }
  return Number(expr);
};

function calc2(expr) {
  var expressionToParse = expr.replace(/\s+/g, '').split('');

  function peek() {
    return expressionToParse[0] || '';
  }

  function get() {
    return expressionToParse.shift();
  }

  function number() {
    var result = get();
    while ((peek() >= '0' && peek() <= '9') || peek() == '.') {
      result += get();
    }
    return parseFloat(result);
  }

  function factor() {
    if (peek() >= '0' && peek() <= '9') {
      return number();
    } else if (peek() == '(') {
      get(); // '('
      var result = expression();
      get(); // ')'
      return result;
    } else if (peek() == '-') {
      get();
      return -factor();
    }
    return 0; // error
  }

  function term() {
    var result = factor();
    while (peek() == '*' || peek() == '/') {
      if (get() == '*') {
        result *= factor();
      } else {
        result /= factor();
      }
    }
    return result;
  }

  function expression() {
    var result = term();
    while (peek() == '+' || peek() == '-') {
      if (get() == '+') {
        result += term();
      } else {
        result -= term();
      }
    }
    return result;
  }

  return expression();
}

const mockExpr =
  ' -4-   (((6)))--7.23--(-8*3/-3/-4/-4/-4/-4)+-6-+8--( 1 -  +   7)  ';
console.log('mi Algoritmo:', calc(mockExpr));
console.log('best Algorithm:', calc2(mockExpr));
console.log('eval de js:', eval(preProcess(mockExpr)));

//Acepted!!, soy Dios, segun Amy Cemar
