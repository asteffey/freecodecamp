import React from 'react';
import Calculator from './Calculator';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';

function App() {
    useFccTest({
        fccTest: FccTests.javascript_calculator,
        // queryParam: 'fcc-test'
    });

    return (
        <main>
            <Calculator/>
        </main>
    );
}

export default App;
