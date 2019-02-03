function getFibonacciSequence(max) {
  if (max <= 1) return [max];

  let sequence = [1];
  let value = 1;

  do {
    sequence.push(value);
    value = sequence[sequence.length-1] + sequence[sequence.length-2];
  } while (value <= max);

  return sequence;
}

function isOdd(num) {
  return num%2 != 0;
}

function sumFibs(max) {
  return getFibonacciSequence(max).reduce(function (sum, value) {
    if (isOdd(value))
      return sum + value;
    else
      return sum;
  }, 0);
}

sumFibs(4);
