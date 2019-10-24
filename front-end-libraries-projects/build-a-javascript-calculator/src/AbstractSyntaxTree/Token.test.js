
import Token from './Token';
import Types from './Types';
import Operations from './operations';

describe('token has correct type', () => {
    test.each`
    value
    ${'0'}
    ${'1'}  
    ${'1.2'}
    ${'-1'}
    ${'-1.2'}
    `('$value is a number', ({ value }) => {
        const token = new Token(value);
        expect(token.isNumber()).toBe(true);
        expect(token.type).toBe(Types.NUMBER);
    });

    test.each`
    value
    ${'.'}
    ${'-'}  
    `('$value is not a number', ({ value }) => {
        const token = new Token(value);
        expect(token.isNumber()).toBe(false);
        expect(token.type).not.toBe(Types.NUMBER);
    });

    test('( is left parenthesis', () => {
        const token = new Token('(');
        expect(token.isLeftParenthesis()).toBe(true);
        expect(token.type).toBe(Types.LEFT_PARENTHESIS);
    });

    test(') is right parenthesis', () => {
        const token = new Token(')');
        expect(token.isRightParenthesis()).toBe(true);
        expect(token.type).toBe(Types.RIGHT_PARENTHESIS);
    });

    test.each(Object.values(Operations))('%p is an operation', (value) => {
        const token = new Token(value);
        expect(token.isOperation()).toBe(true);
        expect(token.type).toBe(Types.OPERATION);
    });

    test.each`
    value
    ${'foo'}
    ${'bar'}
    ${'*'}
    ${'/'}
    `('$value is undefined', ({value}) => {
        const token = new Token(value);
        expect(token.type).toBeUndefined();
    });
    
});

test.each(Object.values(Operations))('retrieves operational config for %p', (value) => {
    const token = new Token(value);
    const {precedence, argCount, func} = token.getOperationConfig();
    
    expect(precedence).toBeGreaterThanOrEqual(1);
    expect(argCount).toBeGreaterThanOrEqual(1);
    expect(typeof func).toBe('function');
});