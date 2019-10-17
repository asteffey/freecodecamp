import React from 'react';
import buttons, { keys as buttonKeys } from '../constants/Buttons';

const Calculator = () => {
    return (
        <div>
            <div id='display'/>
            {buttonKeys.map(key =>  {
                const {id, label} = buttons[key];
                return <button key={key} id={id}>{label}</button>;
            })}
        </div>
    );
};

export default Calculator;