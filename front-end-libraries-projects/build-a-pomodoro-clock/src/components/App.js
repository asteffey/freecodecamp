import React from 'react';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';
import CenterOnScreen from '../elements/CenterOnScreen';
import ThemeProvider from './ThemeProvider';

function App() {
    useFccTest({
        fccTest: FccTests.pomodoro_clock,
        queryParam: 'fcc-test'
    });

    return (
        <ThemeProvider>
            <CenterOnScreen>
                Foo
            </CenterOnScreen>
        </ThemeProvider>
    );
}

export default App;
