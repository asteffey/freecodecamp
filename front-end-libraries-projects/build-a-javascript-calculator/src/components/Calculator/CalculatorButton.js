import React from 'react';
import {Button} from 'rebass';
import PropTypes from 'prop-types';

const CalculatorButton = ({id, label: key, keyBinding, press}) => {
    return (
        <Button id={id} variant='primary' onClick={() => press(key)}>
            {key}
        </Button>
    );
};

CalculatorButton.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    keyBinding: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string
    ]).isRequired,
    press: PropTypes.func.isRequired
};

export default CalculatorButton;