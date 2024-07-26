function queueTime(customers, n) {
  const tills = Array(n).fill(0);
  const dequeue = () => customers.shift();
  const isEmpty = () => customers.length === 0; //is queue empty?
  const minimun = () => Math.min(...tills);
  const maximun = () => Math.max(...tills);
  if(isEmpty()) return 0
  let queueTime = 0;
  let exit = false;
  const reFill = () => {
    for(const idTill in tills){
      if(isEmpty()){
        exit = true;
        break
      }
      //console.log('till prev', tills[idTill])
      if(tills[idTill] !== 0) continue
      tills[idTill] = dequeue() // refill till
      //console.log('till before', tills[idTill])
    }
  }
  reFill();
  while(!exit){
    let minTime = minimun();
    queueTime += minTime
    //console.log('minTime:',minTime)
    for(const idTill in tills){
      tills[idTill] -= minTime
    }
    //console.log('queueTime:', queueTime)
    reFill();
  }
  queueTime += maximun();
  return queueTime;
}

console.log(queueTime([1,2,3,4,5], 100))

//explain with an example
/*
customers or queue = 8 2 3 4 6 7 4 9 20, n or till = 5

              till1 till2 till3 till4 till5 | queueTime
dequeue         8     2     3     4     6   | 2 <- minimun
till2 empty     6     0     1     2     4   | refill till2 with next in queue: 7

dequeue         6     7     1     2     2   | 1 <- minimun
till3 empty     5     6     0     1     3   | refill till3 with next in queue: 4

dequeue         5     6     4     1     3   | 1 <- minimun
till4 empty     4     5     3     0     2   | refill till4 with next in queue: 9

dequeue         4     5     3     9     2   | 2 <- minimun
till5 empty     2     3     1     7     0   | refill till5 with next in queue: 20

dequeue         2     3     1     7    20   | 1 <- minimun
till5 empty     1     2     0     6    19   | refill till3 isnt possible

dequeue         1     2   queue   7    19   | 19 <- maximun and 'exit'
isnt possible             empty

Finally:
queuTime is the sum of all the minimuns and the last maximun
queueTime = 2 + 1 + 1 + 2 + 1 + 19 = 26 
*/