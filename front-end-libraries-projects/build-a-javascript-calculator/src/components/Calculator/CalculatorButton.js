import React from 'react';
import {Button} from 'rebass';
import PropTypes from 'prop-types';

const CalculatorButton = ({command, id, label, keyBinding, press}) => {
    return (
        <Button id={id} variant='primary' onClick={() => press(command)}>
            {label}
        </Button>
    );
};

CalculatorButton.propTypes = {
    command: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    keyBinding: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string
    ]).isRequired,
    press: PropTypes.func.isRequired
};

export default CalculatorButton;