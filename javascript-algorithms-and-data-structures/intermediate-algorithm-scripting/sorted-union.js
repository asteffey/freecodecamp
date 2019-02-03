function *valuesOfSubArrays(array) {
  for (let subArray of array)
    for (let value of subArray)
      yield value;
}

function *uniqueValues(values) {
  let uniqueValues = new Set();
  for (let value of values) {
    if (!uniqueValues.has(value)) {
      uniqueValues.add(value);
      yield value;
    }
  }
}

function uniteUnique(...subArrays) {
  return [...uniqueValues(valuesOfSubArrays(subArrays))];
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);