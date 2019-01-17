function palindrome(str) {
  return isPalindrome(str);
}

function isPalindrome(str) {
  str = str.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase();

  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] != str[right])
      return false;
    left += 1;
    right -= 1;
  }
  
  return true;  
}

function doesTestCasePass(statement, expectedResult) {
  if (eval(statement) != expectedResult) {
    console.log(`FAILED: ${statement} != ${expectedResult}`);
    return false;
  }
  else
    return true;
}

(function test(testCases) {
  if (testCases.every(testCase => doesTestCasePass(...testCase)))
    console.log("All Passed!");
})([
  ['palindrome("eye")', true],
  ['palindrome("_eye")', true],
  ['palindrome("race car")', true],
  ['palindrome("not a   [palindrome")', false],
  ['palindrome("A man, a plan, a canal. Panama")', true],
  ['palindrome("never odd or even")', true],
  ['palindrome("nope")', false],
  ['palindrome("almostomla")', false],
  ['palindrome("My age is 0, 0 si ega ym.")', true],
  ['palindrome("1 eye for of 1 eye.")', false],
  ['palindrome("0_0 (: /-\ :) 0-0")', true],
  ['palindrome("five|\_/|four")', false]
]);

