import '../sass/App.scss';
import React from 'react';
import QuoteBox from './QuoteBox';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';

const App = () => {
    useFccTest({
        fccTest: FccTests.random_quote_machine,
        queryParam: 'fcc-test'
    });

    return (
        <main>
            <QuoteBox />
        </main>
    );
};

export default App;