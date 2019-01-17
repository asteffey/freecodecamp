function checkCashRegister(itemPrice, cashPaid, cashInDrawer) {
  let result = getChangeInCentsFromCashRegister(100 * (cashPaid - itemPrice), convertToCurrencyAmountObject(cashInDrawer));

  if (result.status == "CLOSED")
    return {status: result.status, change: cashInDrawer};
  else if (result.status == "INSUFFICIENT_FUNDS")
    return {status: result.status, change: []};
  else
    return {status: result.status, change: convertToCurrencyDesignationArray(result.change)};
}

const CurrencyAmountsInCents = {
  'PENNY': 1,
  'NICKEL': 5,
  'DIME': 10,
  'QUARTER': 25,
  'ONE': 100,
  'FIVE': 500,
  'TEN': 1000,
  'TWENTY': 2000,
  'ONE HUNDRED': 10000
}

const CurrencyDesignations = swapKeyAndValue(CurrencyAmountsInCents);

function convertToCurrencyAmountObject (currencyArray) {
  let currencyAmountObject = {};
  for (let currencyType of currencyArray)
    currencyAmountObject[CurrencyAmountsInCents[currencyType[0]]] = currencyType[1] * 100;
  return currencyAmountObject;
}

function convertToCurrencyDesignationArray (currencyObject) {
  let currencyDesignationArray = [];
  for (currencyType of getCashTypes(currencyObject).sort(descendingOrder))
    currencyDesignationArray.push([CurrencyDesignations[currencyType], currencyObject[currencyType] / 100]);
  return currencyDesignationArray;
}

function getChangeInCentsFromCashRegister(changeAmount, cashInDrawer) {
  if (changeAmount == getTotalChangeAmountInDrawer(cashInDrawer))
    return {status: "CLOSED", change: cashInDrawer};
  
  let change = {};  
  for (let cashType of getCashTypes(cashInDrawer).sort(descendingOrder)) {
    let changeAmountForCashType = Math.min(cashInDrawer[cashType], Math.floor(changeAmount / cashType) * cashType);
    if (changeAmountForCashType > 0) {
      change[cashType] = changeAmountForCashType;
      changeAmount -= changeAmountForCashType;
      if (changeAmount <= 0) break;
    }
  }

  if (changeAmount > 0)
    return {status: "INSUFFICIENT_FUNDS"};
  else
    return {status: "OPEN", change};

}

function getTotalChangeAmountInDrawer(cashInDrawer) {
  let total = 0;
  for (let cashType in cashInDrawer)
    total += cashInDrawer[cashType];
  return total;
}

function getCashTypes(cash) {
  return Object.keys(cash).map(c => Number.parseInt(c));
}

function descendingOrder(a, b) { return b - a; }
function ascendingOrder(a, b) { return a - b; }


function swapKeyAndValue(obj){
  var swapped = {};
  for(var key in obj)
    swapped[obj[key]] = key;
  return swapped;
}


function doesTestCasePass(statement, expectedResult) {
  let result = JSON.stringify(eval(statement));
  expectedResult = JSON.stringify(expectedResult);
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
  [`checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])`, {status: "OPEN", change: [["QUARTER", 0.5]]}],
  [`checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])`, {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}],
  [`checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])`, {status: "INSUFFICIENT_FUNDS", change: []}],
  [`checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])`, {status: "INSUFFICIENT_FUNDS", change: []}],
  [`checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])`, {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}]
]);