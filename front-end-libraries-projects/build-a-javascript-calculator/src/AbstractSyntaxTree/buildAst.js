import Types from './Types';
import AstNode from './AstNode';

const peek = arr => arr[arr.length - 1];

const buildAst = tokens => {
    const operations = [];
    const astNodes = [];

    const addNumberToAst = token => astNodes.push(new AstNode(token));
    const popOperationToAst = () => {
        const token = operations.pop();
        const astNode = new AstNode(token);
        
        const { argCount } = token.getOperationConfig();
        if (argCount > 1) {
            astNode.setRight(astNodes.pop());
        }
        astNode.setLeft(astNodes.pop());

        astNodes.push(astNode);
    };

    tokens.forEach(token => {
        switch(token.type) {
        case Types.NUMBER:
            addNumberToAst(token);
            break;
        case Types.LEFT_PARENTHESIS:
            operations.push(token);
            break;
        case Types.RIGHT_PARENTHESIS:
            while (operations.length > 0 && !peek(operations).isLeftParenthesis()) {
                popOperationToAst();
            }
            operations.pop(); //pop left parenthesis
            break;
        case Types.OPERATION:
            while (operations.length > 0 
                    && !peek(operations).isLeftParenthesis() 
                    && peek(operations).getOperationConfig().precedence >= token.getOperationConfig().precedence) {
                popOperationToAst();
            }
            operations.push(token);
            break;
        default:
        }
    });

    while (operations.length > 0) {
        popOperationToAst();
    }

    return astNodes.pop();
};

export default buildAst;