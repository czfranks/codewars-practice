function elementalForms(word) {
  if (word.length === 0) return [];
  word = word.toLowerCase();
  const len = word.length;
  const allSymbols = Object.keys(ELEMENTS).map((key) => key.toLowerCase());
  const forms = [];
  const getElement = (symbol) => {
    const [key, value] = Object.entries(ELEMENTS).find(
      (element) => element[0].toLowerCase() === symbol
    );
    return `${value} (${key})`;
  };
  // b e a c h
  const fun = (pos, symbols) => {
    if (pos >= len) {
      const form = [];
      for (const symbol of symbols) {
        form.push(getElement(symbol));
      }
      forms.push(form);
      return;
    }
    if (pos < len) {
      const possibleSymbol = word[pos];
      if (allSymbols.includes(possibleSymbol)) {
        fun(pos + 1, [...symbols, possibleSymbol]);
      }
    }
    if (pos + 1 < len) {
      const possibleSymbol = word[pos] + word[pos + 1];
      if (allSymbols.includes(possibleSymbol)) {
        fun(pos + 2, [...symbols, possibleSymbol]);
      }
    }
    if (pos + 2 < len) {
      const possibleSymbol = word[pos] + word[pos + 1] + word[pos + 2];
      if (allSymbols.includes(possibleSymbol)) {
        fun(pos + 3, [...symbols, possibleSymbol]);
      }
    }
  };
  fun(0, []);
  return forms;
}
