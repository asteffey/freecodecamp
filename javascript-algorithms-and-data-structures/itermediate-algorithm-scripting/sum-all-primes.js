class ArrayWithOffsetIndex {
  constructor(array, offset) {
    this.array = array;
    this.offset = offset;
  }

  get(offsetIndex) {
    return this.array[offsetIndex - this.offset];
  }

  set(offsetIndex, value) {
    this.array[offsetIndex - this.offset] = value;
  }
}

function getPrimesUnderLimit(limit) {
  //use Sieve of Eratosthenes algorithm
  let primes = [];

  let sieve = new ArrayWithOffsetIndex(Array(limit-2), 2);
 
  let value = 2;
  while (value <= limit) {
    primes.push(value);
    
    for (let i=value; i<=limit; i+=value) 
      sieve.set(i, 1);

    do {
      value++;
    } while (value <= limit && sieve.get(value));
  }

  return primes;
}

function sumArray(array) {
	return array.reduce((sum,val) => sum + val, 0);
}

function sumPrimes(num) {
  return sumArray(getPrimesUnderLimit(num));
}

console.log(sumPrimes(10));


