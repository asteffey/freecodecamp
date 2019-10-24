import calculator, { initial } from './calculator';
import { Operations } from '../AbstractSyntaxTree';

const {ADD, MULTIPLY, DIVIDE, SUBTRACT, EXPONENT} = Operations;
const last = array => array[array.length - 1];

const pressKeys = (keys) => {
    var state = initial;
    keys.forEach(key => {
        state = calculator(state, {key});
    });
    return state;
};

test('clears the input', () => {
    const formula = pressKeys(['1','2', ADD, '3', 'C']);
    
    expect(formula).toBe(initial);
});

test.each`
keys | expected
${['1', '2', ADD, '3', '=']} | ${12 + 3}
${['1', '2', ADD, '3', '4', '=']} | ${12 + 34}
${['3', SUBTRACT, '1', '=']} | ${3 - 1}
${['1', SUBTRACT, '3', '=']} | ${1 - 3}
${['3', ADD, '5', MULTIPLY, '6', SUBTRACT, '2', DIVIDE, '4', '=']} | ${3 + 5 * 6 - 2 / 4}
${['1', '0', EXPONENT, '2', '=']} | ${10 ** 2}
${['1', '0', EXPONENT, SUBTRACT, '2', '=']} | ${10 ** -2}
${['2', MULTIPLY, '(', '3', ADD, '4', ')', '=']} | ${2 * (3 + 4)}
${['2', MULTIPLY, '(', '(', '3', ADD, '4', ')', ')', '=']} | ${2 * ((3 + 4))}
`('$keys = $expected', ({keys, expected}) => {
    const formula = pressKeys(keys);
    
    expect(last(formula).value).toBe(expected);
});

test.each`
keys | expected
${['1', '2', '3']} | ${['123']}
${['1', '2', '3', '.', '4']} | ${['123.4']}
${['0', '.', '1']} | ${['0.1']}
${['.', '1']} | ${['0.1']}
${[SUBTRACT, '1']} | ${['0', SUBTRACT, '1']}
${[ADD, SUBTRACT, '1']} | ${['0', ADD, '-1']}
${[ADD, MULTIPLY, '1']} | ${['0', MULTIPLY, '1']}
${['1', ADD, '(', SUBTRACT, '1']} | ${['1', ADD, '(', '-1']}
${['1', ADD, '(', SUBTRACT, '+']} | ${['1', ADD, '(', '-']}
${['1','+','(']} | ${['1','+','(']}
${['(']} | ${['(', '0']}
${['1', '(']} | ${['(', '1']}
${[')']} | ${['0']}
${['1',')']} | ${['1']}
${['1','+','(']} | ${['1','+','(']}
${['1','+',')']} | ${['1','+']}
${['1','+','(', ')']} | ${['1','+','(']}
${['1','+','(', '(']} | ${['1','+','(', '(']}
${['1','+','(', '(', ')']} | ${['1','+','(', '(']}
${['1','+','(', '(', '1', ')']} | ${['1','+','(', '(', '1', ')']}
${['1','+','(', '(', '1', ')', ')']} | ${['1','+','(', '(', '1', ')', ')']}
${['1','+','(', '(', '1', ')', '(']} | ${['1','+','(', '(', '1', ')']}
${['1','+','(', '(', '1', ')', ADD, '1', ')']} | ${['1','+','(', '(', '1', ')', ADD, '1', ')']}
${['1','+','(', '(', '1', ')', ')', ')']} | ${['1','+','(', '(', '1', ')', ')']}
`('$keys = $expected', ({keys, expected}) => {
    const formula = pressKeys(keys).map(token => token.value);
    
    expect(formula).toStrictEqual(expected);
});