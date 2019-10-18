import React from 'react';
import Calculator from './Calculator';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';
import ThemeProvider from './ThemeProvider';

function App() {
    useFccTest({
        fccTest: FccTests.javascript_calculator,
        // queryParam: 'fcc-test'
    });

    return (
        <ThemeProvider>
            <main>
                <Calculator/>
            </main>
        </ThemeProvider>
    );
}

export default App;
