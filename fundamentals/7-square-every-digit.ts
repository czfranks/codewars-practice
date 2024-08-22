export class Kata {
  static squareDigits(num: number): number {
    if (num == 0) return 0;
    let result: string = '';
    while (num) {
      result = (num % 10) ** 2 + result;
      num = Math.floor(num / 10);
    }
    return parseInt(result);
  }
}

const answer = Kata.squareDigits(9119);
console.log('answer', answer);
