import React from 'react';
import buttons from '../../constants/buttons';
import { Box, Text } from 'rebass';
import { Tiles } from '@rebass/layout';
import CalculatorButton from './CalculatorButton';
import useCalculator from '../../hooks/useCalculator';

const Calculator = () => {
    const {displayCurrent, displayFormula, press} = useCalculator();
    return (
        <Box bg='gray'>
            <Box>
                <Text textAlign='right'>{displayFormula}</Text>
            </Box>
            <Box id='display'>
                <Text textAlign='right'>{displayCurrent}</Text>
            </Box>
            <Tiles columns={4}>
                {buttons.map((button, index) =>  
                    <CalculatorButton key={index} {...button} press={press} />
                )}
            </Tiles>
        </Box>
    );
};

export default Calculator;