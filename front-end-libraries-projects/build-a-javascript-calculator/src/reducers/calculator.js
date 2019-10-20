import Operations, { operationList } from '../Calculator/operations';

export const initial = ['0'];

const solve = formula => {
    const divide = new RegExp(Operations.DIVIDE, 'g');
    const mult = new RegExp(Operations.MULTIPLY, 'g');

    const evalExpression = formula.join('').replace(/\^/g, '**').replace(divide, '/').replace(mult, '*');
    
    return eval(evalExpression);
};

const removeLeadingZero = (number) => {
    if (number[0] === '0') {
        if (number[1] === '.') {
            return number;
        } else {
            return number.slice(1);
        }
    } else {
        return number;
    }
};

const isNumber = str => {
    if (str.length === 1 && '0123456789'.includes(str)) {
        return true;
    } else {
        return !isNaN(parseFloat(str));
    }
};

const isSolved = formula => formula[formula.length-2] === '=';

const reduceOpenParenthesis = (open, token) => {
    if (token === '(')
        return open + 1;
    else if (token === ')')
        return open - 1;
    else
        return open;
};

const calculator = (formula = initial, { key }) => {
    const last = formula[formula.length - 1];
    const secondLast = formula[formula.length - 2];

    if (isSolved(formula)) {
        if (operationList.includes(key)) {
            return calculator([last], { key });
        } else {
            return calculator(initial, { key });
        }
    }

    const appendToLast = (part = key) => [...formula.slice(0,-1), removeLeadingZero(last + part)];
    const addItem = (item = key) => [...formula, item];
    const replaceLast = (item = key) => [...formula.slice(0,-1), item];
    const replaceLastTwo = (item = key) => [...formula.slice(0,-2), item];
    const removeLast = () => formula.slice(0,-1);
    const noChange = () => formula;
    
    if (key === 'C') {
        return initial;
    } else if (key === '=') {
        try {
            return [...formula, '=', solve(formula)];
        }
        catch (err) {
            return noChange();
        }
    } else if (isNumber(last) || last === ')') {
        if (isNumber(key)) {
            return appendToLast();
        } else if (key === '.') {
            if (last.includes('.')) {
                return noChange();
            } else {
                return appendToLast();
            }
        } else if (operationList.includes(key)) {
            return addItem();
        } else if (key === ')') {
            const openParenthesis = formula.reduce(reduceOpenParenthesis, 0);
            if (openParenthesis > 0) {
                return addItem();
            }
        }
    } else if (last === '-' && operationList.includes(secondLast)) {
        if (isNumber(key)) {
            return appendToLast();
        } else if (key === '.') {
            return appendToLast('0.');
        } else if (key === '-') {
            return removeLast();
        } else if (operationList.includes(key)) {
            return replaceLastTwo();
        }
    } else if (secondLast === '(' && last === '-') {
        if (isNumber(key)) {
            return appendToLast();
        } else if (key === '.') {
            return appendToLast('0.');
        } else if (key === '-') {
            return removeLast();
        }
    } else if (last === '(') {
        if (isNumber(key)) {
            return addItem();
        } else if (key === '.') {
            return addItem('0.');
        } else if (key === '-') {
            return addItem();
        } else if (key === '(') {
            return addItem();
        }
    } else { // if (operationList.includes(current))
        if (isNumber(key)) {
            return addItem();
        } else if (key === '.') {
            return addItem('0.');
        } else if (key === '-') {
            return addItem();
        } else if (operationList.includes(key)) {
            return replaceLast();
        } else if (key === '(') {
            return addItem();
        }
    } 

    return noChange();

};

export default calculator;