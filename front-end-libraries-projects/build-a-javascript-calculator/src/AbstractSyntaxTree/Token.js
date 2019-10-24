import { isOperation, OperationConfig } from './operations';
import Types from './Types';

const isNumber = value => {
    if (value.length === 1 && '0123456789'.includes(value)) {
        return true;
    } else {
        return !isNaN(parseFloat(value));
    }
};

const getType = value => {
    if (isOperation(value)) {
        return Types.OPERATION;
    } else if (value === '(') {
        return Types.LEFT_PARENTHESIS;
    } else if (value === ')') {
        return Types.RIGHT_PARENTHESIS;
    } else if (isNumber(value)) {
        return Types.NUMBER;
    } else {
        return undefined;
    }
};

class Token {
    constructor(value) {
        this.value = value;
        this.type = getType(value);
    }

    isOperation() {
        return this.type === Types.OPERATION;
    }

    isLeftParenthesis() {
        return this.type === Types.LEFT_PARENTHESIS;
    }

    isRightParenthesis() {
        return this.type === Types.RIGHT_PARENTHESIS;
    }

    isNumber() {
        return this.type === Types.NUMBER;
    }

    getOperationConfig() {
        return OperationConfig[this.value];
    }
}
 
export default Token;