const Operations = {
    ADD: '+', 
    SUBTRACT: '-', 
    MULTIPLY: String.fromCharCode(215), 
    DIVIDE: String.fromCharCode(247), 
    EXPONENT: '^'
};
export default Operations;

export const operationList = Object.values(Operations);
export const isOperation = str => operationList.includes(str);

export const OperationConfig = {
    [Operations.ADD]: {
        precedence: 1,
        argCount: 2,
        func: (x,y) => x+y
    },
    [Operations.SUBTRACT]: {
        precedence: 1,
        argCount: 2,
        func: (x,y) => x-y
    },
    [Operations.MULTIPLY]: {
        precedence: 2,
        argCount: 2,
        func: (x,y) => x*y
    },
    [Operations.DIVIDE]: {
        precedence: 2,
        argCount: 2,
        func: (x,y) => x/y
    },
    [Operations.EXPONENT]: {
        precedence: 3,
        argCount: 2,
        func: (x,y) => x**y
    }
};
