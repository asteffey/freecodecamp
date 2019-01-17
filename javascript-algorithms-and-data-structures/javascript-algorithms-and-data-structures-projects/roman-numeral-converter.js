const RomanNumeralDigits = {
  1000: 'M',
  500: 'D',
  100: 'C',
  50: 'L',
  10: 'X',
  5: 'V',
  1: 'I'
};

function convertToRoman(num) {
  if (num < 0 || 3999 < num)
    throw new Error("number out of range");

  let romanNumerals = "";
  
  for (let i = 3; i >= 0; i--) {
    let place = Math.pow(10, i);
    let digit = Math.floor(num / place);
    
    if (digit == 9)
      romanNumerals += RomanNumeralDigits[place] + RomanNumeralDigits[place * 10];
    else if (digit >= 5)
      romanNumerals += RomanNumeralDigits[place * 5] + RomanNumeralDigits[place].repeat(digit - 5);
    else if (digit == 4)
      romanNumerals += RomanNumeralDigits[place] + RomanNumeralDigits[place * 5];
    else if (digit > 0)
      romanNumerals += RomanNumeralDigits[place].repeat(digit);

    num %= place;
  }
  return romanNumerals;
}

function doesTestCasePass(statement, expectedResult) {
  let result = eval(statement);
  if (result != expectedResult) {
    console.log(`FAILED: ${statement}: ${result} != ${expectedResult}`);
    return false;
  }
  else
    return true;
}

(function test(testCases) {
  if (testCases.reduce((allPassed, testCase) => doesTestCasePass(...testCase) && allPassed, true))
    console.log("All Passed!");
})([
  [`convertToRoman(2)`, "II"],
  [`convertToRoman(3)`, "III"],
  [`convertToRoman(4)`, "IV"],
  [`convertToRoman(5)`, "V"],
  [`convertToRoman(9)`, "IX"],
  [`convertToRoman(12)`, "XII"],
  [`convertToRoman(16)`, "XVI"],
  [`convertToRoman(29)`, "XXIX"],
  [`convertToRoman(44)`, "XLIV"],
  [`convertToRoman(45)`, "XLV"],
  [`convertToRoman(68)`, "LXVIII"],
  [`convertToRoman(83)`, "LXXXIII"],
  [`convertToRoman(97)`, "XCVII"],
  [`convertToRoman(99)`, "XCIX"],
  [`convertToRoman(400)`, "CD"],
  [`convertToRoman(500)`, "D"],
  [`convertToRoman(501)`, "DI"],
  [`convertToRoman(649)`, "DCXLIX"],
  [`convertToRoman(798)`, "DCCXCVIII"],
  [`convertToRoman(891)`, "DCCCXCI"],
  [`convertToRoman(1000)`, "M"],
  [`convertToRoman(1004)`, "MIV"],
  [`convertToRoman(1006)`, "MVI"],
  [`convertToRoman(1023)`, "MXXIII"],
  [`convertToRoman(2014)`, "MMXIV"],
  [`convertToRoman(3999)`, "MMMCMXCIX"]
]);