function getPrimesUnderLimit(limit) {
  let primeCandidate = new Array(limit+1);
  primeCandidate.fill(false, 0, 2);
  primeCandidate.fill(true, 2, limit+1);
  
  for (let i=2; i<=Math.floor(Math.sqrt(limit)); i++) {
  if (primeCandidate[i])
      for (let j=Math.pow(i,2); j<=limit; j+=i)
        primeCandidate[j] = false;
  }
  
  return primeCandidate
          .map((value, index) => value?index:value)
          .filter(value => value!=false);
}

function smallestCommons(inclusiveRangeEndpoints) {
  let rangeMin = Math.max(2, Math.min(...inclusiveRangeEndpoints));
  let rangeMax = Math.max(...inclusiveRangeEndpoints);

  let primes = getPrimesUnderLimit(rangeMax);
  console.log(primes);
  let exponentOfEachPrime = new Array(primes.length).fill(0);
  
  for (let i=rangeMin; i<=rangeMax; i++) {
    let numToFactorize = i;
    for (let j=0; j<primes.length; j++) {
      let prime = primes[j];
      let exponentOfPrime = 0;
      while (numToFactorize%prime == 0) {
        exponentOfPrime += 1;
        numToFactorize /= prime;
        //console.log(i + " % " + prime + "^" + exponentOfPrime + " == 0");
      }
      exponentOfEachPrime[j] = Math.max(exponentOfEachPrime[j], exponentOfPrime);
    }
  }

  console.log(exponentOfEachPrime);

  let smallestCommonMultiple = 1;
  for (let i=0; i<primes.length; i++) {
    //console.log(primes[i]+"^"+exponentOfEachPrime[i]);
    smallestCommonMultiple *= Math.pow(primes[i], exponentOfEachPrime[i]);
  }
    

  return smallestCommonMultiple;
}

console.log(smallestCommons([1,5]));