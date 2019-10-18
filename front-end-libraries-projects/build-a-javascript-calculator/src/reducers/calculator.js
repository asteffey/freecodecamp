

export const initial = ['0'];

const solve = formula => {
    const foo = formula.join('').replace(/\^/g, '**');
    console.log(foo);
    return eval(foo);
    //return eval(formula.join('').replace(/\^/g, '**'));
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

const calculator = (formula = initial, { type: command }) => {
    
    const current = formula[formula.length - 1];
    
    const isNumber = !isNaN(parseFloat(current));
    const isSolved = formula.includes('=');

    if (isSolved) {
        return calculator([current], { type: command });
    }

    const appendToItem = (part = command) => [...formula.slice(0,-1), removeLeadingZero(current + part)];
    const addItem = (item = command) => [...formula, item];
    const replaceItem = (item = command) => [...formula.slice(0,-1), item];
    const noChange = () => [...formula];

    switch (command) {   
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
        if (isNumber) {
            return appendToItem();
        } else {
            return addItem();
        }
    case '.':
        if (isNumber && current.includes('.')) {
            return noChange();
        } else if (isNumber) {
            return appendToItem();
        } else {
            return addItem('0.');
        }
    case '+':
    case '*':
    case '/':
    case '^':
        if (isNumber || current===')') {
            return addItem();
        } else if ('+*/^-'.includes(current[0]) ) {
            return replaceItem();
        } else {
            return noChange();
        }
    case '-':
        if (isNumber || current===')') {
            return addItem();
        } else if ('+*/^'.includes(current) ) {
            return appendToItem();
        } else {
            return noChange();
        }
    case '(':
        //TODO: implement '('
        return noChange();
    case ')':
        //TODO: implement ')'
        return noChange();
    case 'c':
        return initial;
    case '=':
        try {
            return [...formula, '=', solve(formula)];
        }
        catch (err) {
            return noChange();
        }
    default:
        return noChange();
    }
};

export default calculator;