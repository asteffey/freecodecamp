import React from 'react';
import Calculator from './Calculator';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';
import { Flex } from 'rebass';

function App() {
    useFccTest({
        fccTest: FccTests.javascript_calculator,
        // queryParam: 'fcc-test'
    });

    return (
        <Flex alignItems='center' justifyContent='center' height='100vh' bg='#d2d3f7'>
            <Calculator/>
        </Flex>
    );
}

export default App;
