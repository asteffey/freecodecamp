import React from 'react';
import useCalculator from '../../hooks/useCalculator';
import buttons from '../../constants/buttons';
import Frame from './Frame.style';
import DigitalDisplay from './DigitalDisplay.style';
import Buttons from './Buttons.style';
import Button from './CalculatorButton';

import './calculator.css';

const Calculator = () => {
    const {displayCurrent, displayFormula, press} = useCalculator();
    return (
        <Frame>
            <DigitalDisplay size='small'>{displayFormula}</DigitalDisplay>
            <DigitalDisplay size='big' id='display'>{displayCurrent}</DigitalDisplay>
            <Buttons>
                {buttons.map((button, index) =>  
                    <Button key={index} {...button} press={press} sx={{gridArea: button.id}} />
                )}
            </Buttons>
        </Frame>
    );
};

export default Calculator;