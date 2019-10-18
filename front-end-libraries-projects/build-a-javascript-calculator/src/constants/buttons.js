const buttons = [
    {
        command: 'c',
        id: 'clear',
        label: 'C',
        keyBinding: ['c', 'C']
    },
    {
        command: '(',
        id: 'open-parenthesis',
        label: '(',
        keyBinding: '('
    },
    {
        command: ')',
        id: 'close-parenthesis',
        label: ')',
        keyBinding: ')'
    },
    {
        command: '^',
        id: 'exponent',
        label: 'exp',
        keyBinding: '^'
    },
    {
        command: '7',
        id: 'seven',
        label: '7',
        keyBinding: '7'
    },
    {
        command: '8',
        id: 'eight',
        label: '8',
        keyBinding: '8'
    },
    {
        command: '9',
        id: 'nine',
        label: '9',
        keyBinding: '9'
    },
    {
        command: '+',
        id: 'add',
        label: '+',
        keyBinding: '+'
    },
    {
        command: '4',
        id: 'four',
        label: '4',
        keyBinding: '4'
    },
    {
        command: '5',
        id: 'five',
        label: '5',
        keyBinding: '5'
    },
    {
        command: '6',
        id: 'six',
        label: '6',
        keyBinding: '6'
    },
    {
        command: '-',
        id: 'subtract',
        label: '-',
        keyBinding: '-'
    },
    {
        command: '1',
        id: 'one',
        label: '1',
        keyBinding: '1'
    },
    {
        command: '2',
        id: 'two',
        label: '2',
        keyBinding: '2'
    },
    {
        command: '3',
        id: 'three',
        label: '3',
        keyBinding: '3'
    },
    {
        command: '*',
        id: 'multiply',
        label: String.fromCharCode(215),
        keyBinding: '*'
    },
    {
        command: '0',
        id: 'zero',
        label: '0',
        keyBinding: '0'
    },
    {
        command: '.',
        id: 'decimal',
        label: '.',
        keyBinding: '.'
    },
    {
        command: '=',
        id: 'equals',
        label: '=',
        keyBinding: ['=', String.fromCharCode(13)]
    },
    {
        command: '/',
        id: 'divide',
        label: String.fromCharCode(247),
        keyBinding: '/'
    }
];

export default buttons;