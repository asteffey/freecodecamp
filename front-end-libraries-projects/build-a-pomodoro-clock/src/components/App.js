import React from 'react';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';
import CenterOnScreen from '../elements/CenterOnScreen';
import ThemeProvider from './ThemeProvider';
import Pomodoro from './Pomodoro';

function App() {
    useFccTest({
        fccTest: FccTests.pomodoro_clock,
        queryParam: 'fcc-test'
    });

    return (
        <ThemeProvider>
            <CenterOnScreen>
                <Pomodoro />
            </CenterOnScreen>
        </ThemeProvider>
    );
}

export default App;
