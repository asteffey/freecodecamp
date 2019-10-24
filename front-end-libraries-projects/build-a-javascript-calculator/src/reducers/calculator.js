import { Operations, Token, Types, buildAst } from '../AbstractSyntaxTree';

export const initial = [new Token('0')];

const solve = formula => {
    const ast = buildAst(formula);
    const result = ast.solve();
    return new Token(result);
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

const isSolved = formula => formula.length > 2 && formula[formula.length-2].value === '=';

const hasOpenParenthesis = formula => formula.reduce(reduceOpenParenthesis, 0) > 0;

const reduceOpenParenthesis = (open, token) => {
    if (token.isLeftParenthesis())
        return open + 1;
    else if (token.isRightParenthesis())
        return open - 1;
    else
        return open;
};

const calculator = (formula = initial, { key }) => {
    const token = new Token(key);

    const last = formula[formula.length - 1];
    const secondLast = formula[formula.length - 2];

    if (isSolved(formula)) {
        if (token.isOperation()) {
            return calculator([last], { key });
        } else {
            return calculator(initial, { key });
        }
    }
    
    const appendToLast = (part = token.value) => [...formula.slice(0,-1), new Token(removeLeadingZero(last.value + part))];
    const addItem = (item = token) => [...formula, item instanceof Token ? item : new Token(item)];
    const insertBeforeLast = (item = token) => [...formula.slice(0,-1), item, last];
    const replaceLast = (item = token) => [...formula.slice(0,-1), item];
    const replaceLastTwo = (item = token) => [...formula.slice(0,-2), item];
    const removeLast = () => formula.slice(0,-1);
    const noChange = () => formula;
    
       
    switch(token.value) {
    case 'C':
        return initial;
    case '=':
        try {
            return [...formula, token, solve(formula)];
        }
        catch (err) {
            return noChange();
        }
    case '.':
        if (last.isNumber()) {
            if (last.value.includes('.')) {
                return noChange();
            } else {
                return appendToLast();
            }
        } else if (last.isLeftParenthesis() || last.isOperation()) {
            return addItem('0.');
        } else if (last.value === Operations.SUBTRACT 
            && (secondLast.isOperation() || secondLast.isLeftParenthesis())) {
            return appendToLast('0.');
        }
        break;
    case '-':
        if (last.value === Operations.SUBTRACT 
            && (secondLast.isOperation() || secondLast.isRightParenthesis())) {
            return removeLast();
        } else if (last.isLeftParenthesis() || last.isOperation() || last.isNumber() || last.isRightParenthesis()) {
            return addItem();
        }
        break;
    default:
        switch(token.type) {
        case Types.NUMBER:
            if (last.isNumber()) {
                return appendToLast();
            } else if (last.value === Operations.SUBTRACT 
                && (secondLast.isOperation() || secondLast.isLeftParenthesis())) {
                return appendToLast();
            } else if (last.isLeftParenthesis() || last.isOperation()) {
                return addItem();
            }
            break;
        case Types.LEFT_PARENTHESIS:
            if (last.isLeftParenthesis() || last.isOperation()) {
                return addItem();
            } else if (last.isNumber()) {
                return insertBeforeLast();
            }
            break;
        case Types.RIGHT_PARENTHESIS:
            if ((last.isNumber() || last.isRightParenthesis())
                && hasOpenParenthesis(formula)) {
                return addItem();
            }
            break;
        case Types.OPERATION:
            if (last.isNumber() || last.isRightParenthesis()) {
                return addItem();
            } else if (last.value === Operations.SUBTRACT && secondLast.isOperation()) {
                return replaceLastTwo();
            } else if (last.value === Operations.SUBTRACT && secondLast.isLeftParenthesis()) {
                return noChange();
            } else if (last.isOperation()) {
                return replaceLast();
            }
            break;
        default:
        }
    }

    

    return noChange();

};

export default calculator;