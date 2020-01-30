import React from 'react';
import GdpChart from './GdpChart';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';

const App = () => {
    useFccTest({
        fccTest: FccTests.bar_chart,
        queryParam: 'fcc-test'
    });

    return (
        <main>
            <GdpChart />
        </main>
    );
};

export default App;
