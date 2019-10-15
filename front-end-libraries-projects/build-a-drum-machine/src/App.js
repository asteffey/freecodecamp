import React from 'react';
import './App.css';
import DrumMachine from './components/DrumMachine';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';

function App() {
    useFccTest({ 
        fccTest: FccTests.drum_machine,
        queryParam: 'fcc-test'
    });

    return (
        <DrumMachine/>
    );
}

export default App;
