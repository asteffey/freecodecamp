function steamrollArray(arr) {
  return getAllValuesInNestedArray(arr);
}

function getAllValuesInNestedArray(nestedArray) {
  let values = [];

  (function allValuesInNestedArray(nestedArray) {
    for (let element of nestedArray) {
      if (Array.isArray(element))
        allValuesInNestedArray(element);
      else
        values.push(element);
    }
  })(nestedArray);

  return values;
}


console.log(steamrollArray([[["a"]], [["b"]]]) +" == "+ ["a", "b"]);
console.log(steamrollArray([1, [2], [3, [[4]]]]) +" == "+ [1, 2, 3, 4]);
console.log(steamrollArray([1, [], [3, [[4]]]]) +" == "+ [1, 3, 4]);
console.log(steamrollArray([1, {}, [3, [[4]]]]) +" == "+ [1, {}, 3, 4]);