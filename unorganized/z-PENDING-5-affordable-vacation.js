//SOY CORRELON, ESTE PROBLEMA ME MORTIFICA GAAAA XD
//LO PONGO EN PENDIENTE
//USAR METODO 02 PUNTEROS
//ESTOY SEGURO QUE CON ESA VAINA SALE!!!!
//https://www.codewars.com/kata/66871953e441f6da6e36a0cc/train/javascript
function findMinCost(money, days, cost) {
  let i, j;
  const len = cost.length;
  let tmp = 0;
  for (i = 0, j = 0; i < len && j < len; ) {
    tmp += cost[j];
    if (tmp > money) {
      ++i;
      while (tmp > money) {
        //tmp -=
      }
      // 1 2 3 2 2 10,
    }
  }

  /* 1 23 4 5 56 67 7 8 9 67 4 3 4
    i         j */
  //return "money: {minimum_money_for_vacation}";
  //return "days: {maximum_duration_of_vacation}"
}
