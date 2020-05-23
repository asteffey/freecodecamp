import React from 'react';
import GlobalTemp from './GlobalTemp';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';

const App = () => {
    useFccTest({
        fccTest: FccTests.heat_map,
        queryParam: 'fcc-test'
    });

    return (
        <main>
            <GlobalTemp />
        </main>
    );
};

export default App;
