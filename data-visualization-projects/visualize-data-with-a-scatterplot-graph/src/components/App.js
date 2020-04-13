import React from 'react';
import CyclistChart from './CyclistChart';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';

const App = () => {
    useFccTest({
        fccTest: FccTests.scatter_plot,
        queryParam: 'fcc-test'
    });

    return (
        <main>
            <CyclistChart />
        </main>
    );
};

export default App;
