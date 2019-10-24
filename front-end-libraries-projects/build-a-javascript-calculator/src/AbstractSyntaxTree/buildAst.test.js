import buildAst from './buildAst';
import Operations from './operations';
import Token from './Token';

test.each`
equation                                                       | expected
${[1, Operations.ADD, 2]}                                      | ${1 + 2}
${[1, Operations.ADD, '(', 2, Operations.MULTIPLY, 3, ')']}    | ${1 + (2 * 3)}
${['(', 2, Operations.ADD, 2, ')', Operations.EXPONENT, 2]}    | ${(2 + 2) ** 2}
`('$equation = $expected', ({equation, expected}) => {
    const tokens = equation.map(v => new Token(v));
    const result = buildAst(tokens);

    expect(result.solve()).toBe(expected);
});