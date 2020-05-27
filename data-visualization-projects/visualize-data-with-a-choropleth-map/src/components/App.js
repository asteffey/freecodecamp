import React from 'react';
import EducationAttainment from './EducationAttainment';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';

const App = () => {
    useFccTest({
        fccTest: FccTests.choropleth,
        queryParam: 'fcc-test'
    });

    return (
        <EducationAttainment />
    );
};

export default App;
