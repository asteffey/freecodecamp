const buttons = {
    0: {
        id: 'zero',
        label: '0'
    },
    1: {
        id: 'one',
        label: '1'
    },
    2: {
        id: 'two',
        label: '2'
    },
    3: {
        id: 'three',
        label: '3'
    },
    4: {
        id: 'four',
        label: '4'
    },
    5: {
        id: 'five',
        label: '5'
    },
    6: {
        id: 'six',
        label: '6'
    },
    7: {
        id: 'seven',
        label: '7'
    },
    8: {
        id: 'eight',
        label: '8'
    },
    9: {
        id: 'nine',
        label: '9'
    },
    '.': {
        id: 'decimal',
        label: '.'
    },
    '+': {
        id: 'add',
        label: '+'
    },
    '-': {
        id: 'subtract',
        label: '-'
    },
    '*': {
        id: 'multiply',
        label: String.fromCharCode(215)
    },
    '/': {
        id: 'divide',
        label: String.fromCharCode(247)
    },
    '=': {
        id: 'equals',
        label: '='
    },
    'c': {
        id: 'clear',
        label: 'C'
    }
};

export const keys = Object.keys(buttons);

export default buttons;