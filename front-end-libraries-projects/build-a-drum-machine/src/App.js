import React from 'react';
import DrumMachine from './components/DrumMachine';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';
import ThemeProvider from './components/ThemeProvider';

function App() {
    useFccTest({ 
        fccTest: FccTests.drum_machine,
        queryParam: 'fcc-test'
    });

    return (
        <ThemeProvider>
            <DrumMachine/>
        </ThemeProvider>
    );
}

export default App;
