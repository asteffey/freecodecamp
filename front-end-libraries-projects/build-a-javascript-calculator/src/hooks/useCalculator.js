import { useReducer, useCallback } from 'react';
import calculator, { initial } from '../reducers/calculator';

const useCalculator = () => {
    const [formula, dispatch] = useReducer(calculator, initial);

    const press = useCallback(
        (command) => dispatch({type: command}), 
        [dispatch]
    );

    return {
        displayCurrent: formula.slice(-1), 
        displayFormula: formula.join(''), 
        press
    };
};

export default useCalculator;