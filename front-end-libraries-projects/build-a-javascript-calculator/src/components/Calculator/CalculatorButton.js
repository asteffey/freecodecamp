import React, { useCallback } from 'react';
import {Button} from 'rebass';
import PropTypes from 'prop-types';
import useKey from '../../hooks/useKey';

const CalculatorButton = ({id, label: key, keyBinding, press, ...props}) => {
    const onClick = useCallback(() => press(key), [press, key]);

    useKey(onClick, keyBinding);

    return (
        <Button id={id} bg='#163e7d' onClick={onClick} m={1} {...props}>
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