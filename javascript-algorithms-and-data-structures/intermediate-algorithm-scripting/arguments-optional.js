function addTogether(...args) {
  let num1 = args[0];

  function sum (num2) {
    if (typeof num2 == 'number')
      return num1 + num2;
    else
      return undefined;
  }
  
  if (typeof num1 != 'number')
    return undefined;
  else if (args.length == 2)
    return sum(args[1]);
  else
    return sum;
}

console.log(addTogether(2, 3) +"=="+ 5);
console.log(addTogether(2)(3) +"=="+ 5);
console.log(addTogether("http://bit.ly/IqT6zt") +"=="+ undefined);
console.log(addTogether(2, "3") +"=="+ undefined);
console.log(addTogether(2)([3]) +"=="+ undefined);