function justify(text, width) {
  const words = text.split(' ');
  const len = words.length;
  let pos = 0;
  const getWidth = () => {
    let size = 0;
    let count = 0;
    const choices = [];
    while (true) {
      const word = words[pos];
      if (size + word.length + (count === 0 ? 0 : count) > width) break;
      choices.push(word);
      size += word.length;
      ++pos;
      ++count;
    }
    return [choices, size];
  };
  const getSizeRemaining = () => {
    let size = 0;
    for (let i = pos; i < len; ++i) {
      size += words[i].length;
    }
    return size + len - pos - 1;
  };

  const getLineJustify = (choices, size) => {
    if (choices.length === 1) return choices[0] + '\n';
    const remain = width - size;
    const gaps = choices.length - 1;
    let line = choices[0];
    let megaGaps = remain % gaps;
    for (let i = 1; i < choices.length; ++i) {
      if (megaGaps > 0) {
        line += ' '.repeat(Math.ceil(remain / gaps)) + choices[i];
        --megaGaps;
        continue;
      }
      line += ' '.repeat(Math.floor(remain / gaps)) + choices[i];
    }
    return line + '\n';
  };
  let justify = '';
  while (getSizeRemaining() > width) {
    const [choices, size] = getWidth();
    const line = getLineJustify(choices, size);
    justify += line;
  }
  justify += words.slice(pos, len).join(' ');
  return justify;
}
