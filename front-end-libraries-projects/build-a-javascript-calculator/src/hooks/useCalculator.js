import { useReducer, useCallback } from 'react';
import calculator, { initial } from '../reducers/calculator';

const useCalculator = () => {
    const [formula, dispatch] = useReducer(calculator, initial);

    const press = useCallback(
        (key) => dispatch({key}), 
        [dispatch]
    );

    return {
        displayCurrent: formula[formula.length-1].value, 
        displayFormula: formula.map(token => token.value).join(''), 
        press
    };
};

export default useCalculator;