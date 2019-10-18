const Operations = {
    ADD: '+', 
    SUBTRACT: '-', 
    MULTIPLY: String.fromCharCode(215), 
    DIVIDE: String.fromCharCode(247), 
    EXPONENT: '^'
};
export default Operations;

export const operationList = Object.values(Operations);


export const OperatorConfig = {
    ADD: {
        precedence: 1,
        arguments: 2,
        func: (x,y) => x+y
    },
    SUBTRACT: {
        precedence: 1,
        arguments: 2,
        func: (x,y) => x-y
    },
    MULTIPLY: {
        precedence: 1,
        arguments: 2,
        func: (x,y) => x*y
    },
    DIVIDE: {
        precedence: 1,
        arguments: 2,
        func: (x,y) => x/y
    },
    EXPONENT: {
        precedence: 3,
        arguments: 2,
        func: (x,y) => x**y
    }
};
