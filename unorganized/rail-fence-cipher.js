function encodeRailFenceCipher(string, numberRails) {
  const r = numberRails;
  if (r <= 1) return string;
  const jump = 2 * r - 2;
  const advance = Array(r)
    .fill()
    .map((_, i) => {
      const left = jump - 2 * i;
      const right = 2 * i;
      const array = [];
      if (left !== 0) array.push(left);
      if (right !== 0) array.push(right);
      return array;
    });

  const rails = Array(r)
    .fill()
    .map(() => []);
  rails.forEach((rail, index) => {
    for (let i = index, k = 0; i < string.length; ) {
      rail.push(string[i]);
      i += advance[index][k];
      k = (k + 1) % advance[index].length;
    }
  });

  return rails.map((rail) => rail.join('')).join('');
}

function decodeRailFenceCipher(string, numberRails) {
  const r = numberRails;
  if (r <= 1) return string;
  const jump = 2 * r - 2;
  const advance = Array(r)
    .fill()
    .map((_, i) => {
      const left = jump - 2 * i;
      const right = 2 * i;
      const array = [];
      if (left !== 0) array.push(left);
      if (right !== 0) array.push(right);
      return array;
    });

  const rails = Array(r)
    .fill()
    .map(() => []);

  const decode = Array(string.length).fill('.');
  let j = 0;
  rails.forEach((rail, index) => {
    for (let i = index, k = 0; i < string.length; ) {
      //rail.push(string[i]); //encode
      decode[i] = string[j]; //decode

      i += advance[index][k];
      k = (k + 1) % advance[index].length;
      ++j;
    }
  });

  //return rails.map((rail) => rail.join('')).join(''); //encode
  return decode.join(''); //decode
}

//const encode = encodeRailFenceCipher('WEAREDISCOVEREDFLEEATONCE', 3);
//const encode = encodeRailFenceCipher('abcdefghijklmnopqrstuvwxyz', 9);
//const decode = decodeRailFenceCipher(encode, 9);
