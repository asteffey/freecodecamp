function getPrimesUnderLimit(limit) {
  let primeCandidate = new Array(limit + 1);
  primeCandidate.fill(false, 0, 2);
  primeCandidate.fill(true, 2, limit + 1);

  for (let i = 2; i <= Math.floor(Math.sqrt(limit)); i++) {
    if (primeCandidate[i])
      for (let j = Math.pow(i, 2); j <= limit; j += i)
        primeCandidate[j] = false;
  }

  return primeCandidate
    .map((value, index) => value ? index : value)
    .filter(value => value != false);
}

function findTimesDivisible(num, divisor) {
  let timesDivisible = 0;
  while (num % divisor == 0) {
    timesDivisible += 1;
    num /= divisor;
  }
  return timesDivisible;
}

function reduceToProduct(product, value) {
  return product * value;
}

function findLeastCommonMultiple(...args) {
  let maxExponentOfEachPrime = {};
  getPrimesUnderLimit(Math.max(...args)).forEach(prime => {
    maxExponentOfEachPrime[prime] = 0;
  });

  for (let numToFactorize of args)
    for (let prime in maxExponentOfEachPrime)
      maxExponentOfEachPrime[prime] = Math.max(maxExponentOfEachPrime[prime], findTimesDivisible(numToFactorize, prime));

  return Object.keys(maxExponentOfEachPrime).map(prime => Math.pow(prime, maxExponentOfEachPrime[prime]))
    .reduce(reduceToProduct, 1);
}

function createNumberSequence(min, max) {
  let sequence = [];
  for (let n = min; n <= max; n++)
    sequence.push(n);
  return sequence;
}

function smallestCommons(inclusiveRangeEndpoints) {
  let min = Math.min(...inclusiveRangeEndpoints);
  let max = Math.max(...inclusiveRangeEndpoints);

  return findLeastCommonMultiple(...createNumberSequence(min, max));
}

console.log(smallestCommons([1, 5]));