class AstNode {
    constructor(token) {
        this.token = token;

        this.left = null;
        this.right = null;
    }

    setRight(astNode) {
        this.right = astNode;
    }

    setLeft(astNode) {
        this.left = astNode;
    }

    solve() {
        if (this.token.isNumber()) {
            return parseFloat(this.token.value);
        } else if (this.token.isOperation()) {
            const {argCount, func} = this.token.getOperationConfig();
            if (argCount === 1 && this.left !== null) {
                return func(this.left.solve());
            } else if (argCount === 2 && this.left !== null && this.right !== null) {
                return func(this.left.solve(), this.right.solve());
            }
            
        }
        
        //otherwise
        throw Error('invalid token type in AST');
    }
}

export default AstNode;