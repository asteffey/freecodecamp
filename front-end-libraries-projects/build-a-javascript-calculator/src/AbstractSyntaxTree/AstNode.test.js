import Token from './Token';
import Operations from './operations';
import AstNode from './AstNode';

const createNodes = () => ({
    one: createNode(1),
    two: createNode(2),
    three: createNode(3),
    add: createNode(Operations.ADD),
    multiply: createNode(Operations.MULTIPLY)
});

const createNode = value => {
    return new AstNode(new Token(value));
};

describe('AstNode', () => {

    test('can construct a valid AST', () => {
        const {one, two, add} = createNodes();
        add.setLeft(one);
        add.setRight(two);

        expect(add.left.value).toBe(one.value);
        expect(add.right.value).toBe(two.value);
    });

    test.each([1,2])('%p solves as %p', (value) => {
        const node = createNode(value);

        expect(node.solve()).toBe(value);
    });
    
    test('can solve single level equation', () => {
        const {one, two, add} = createNodes();
        add.setLeft(one);
        add.setRight(two);

        expect(add.solve()).toBe(1 + 2);
    });

    test('can solve multi-level equation', () => {
        const {one, two, three, add, multiply} = createNodes();

        add.setLeft(one);
        add.setRight(multiply);
        multiply.setLeft(two);
        multiply.setRight(three);

        expect(add.solve()).toBe(1 + (2 * 3));
    });

    test('throws error when insufficent children for operation', () => {
        const {one, add} = createNodes();

        add.setLeft(one);

        expect(() => add.solve()).toThrowError();
    });    
});