function topThreeWords(text) {
  const words = text
    .toLowerCase()
    .split('')
    .map((chr) => (/^[a-zA-Z']+$/.test(chr) ? chr : ' '))
    .join('')
    .split(' ');
  const frequency = {};
  for (const word of words) {
    if (!word || word === "'") continue;
    frequency[word] = (frequency[word] || 0) + 1;
  }
  const most = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
  return most.slice(0, 3).map((frec) => frec[0]);
}

//In a regular expression ^ and $, indicates if the word match
//since begin at the end with regular expression
