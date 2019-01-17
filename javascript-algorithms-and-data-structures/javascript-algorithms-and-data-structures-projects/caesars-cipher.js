function rot13(encryptedString) {
  return decryptRot13String(encryptedString);
}

function decryptRot13String(encryptedString) {
  return encryptedString
    .split('')
    .map(decryptRot13Char)
    .join('');
}

function decryptRot13Char(encryptedChar) {
  let encryptedCharCode = getCharCode(encryptedChar);
  let encryptedLowerCaseCharCode = getCharCode(encryptedChar.toLowerCase());
  
  if (getCharCode('a') <= encryptedLowerCaseCharCode && encryptedLowerCaseCharCode <= getCharCode('m'))
    return String.fromCharCode(encryptedCharCode + 13);
  else if (getCharCode('n') <= encryptedLowerCaseCharCode && encryptedLowerCaseCharCode <= getCharCode('z'))
    return String.fromCharCode(encryptedCharCode - 13);
  else
    return encryptedChar;
}

function getCharCode(char) {
  return char.charCodeAt(0);
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
  ['rot13("SERR PBQR PNZC")', 'FREE CODE CAMP'],
  ['rot13("SERR CVMMN!")', 'FREE PIZZA!'],
  ['rot13("SERR YBIR?")', 'FREE LOVE?'],
  ['rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.")', 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.']
]);