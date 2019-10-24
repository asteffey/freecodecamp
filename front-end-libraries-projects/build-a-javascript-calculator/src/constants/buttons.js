import { Operations } from '../AbstractSyntaxTree';

const buttons = [
    {
        id: 'clear',
        label: 'C',
        keyBinding: ['c', 'C']
    },
    {
        id: 'open-parenthesis',
        label: '(',
        keyBinding: '('
    },
    {
        id: 'close-parenthesis',
        label: ')',
        keyBinding: ')'
    },
    {
        id: 'exponent',
        label: Operations.EXPONENT,
        keyBinding: '^'
    },
    {
        id: 'seven',
        label: '7',
        keyBinding: '7'
    },
    {
        id: 'eight',
        label: '8',
        keyBinding: '8'
    },
    {
        id: 'nine',
        label: '9',
        keyBinding: '9'
    },
    {
        id: 'add',
        label: Operations.ADD,
        keyBinding: '+'
    },
    {
        id: 'four',
        label: '4',
        keyBinding: '4'
    },
    {
        id: 'five',
        label: '5',
        keyBinding: '5'
    },
    {
        id: 'six',
        label: '6',
        keyBinding: '6'
    },
    {
        id: 'subtract',
        label: Operations.SUBTRACT,
        keyBinding: '-'
    },
    {
        id: 'one',
        label: '1',
        keyBinding: '1'
    },
    {
        id: 'two',
        label: '2',
        keyBinding: '2'
    },
    {
        id: 'three',
        label: '3',
        keyBinding: '3'
    },
    {
        id: 'multiply',
        label: Operations.MULTIPLY,
        keyBinding: '*'
    },
    {
        id: 'zero',
        label: '0',
        keyBinding: '0'
    },
    {
        id: 'decimal',
        label: '.',
        keyBinding: '.'
    },
    {
        id: 'equals',
        label: '=',
        keyBinding: ['=', 'Enter']
    },
    {
        id: 'divide',
        label: Operations.DIVIDE,
        keyBinding: '/'
    }
];

export default buttons;