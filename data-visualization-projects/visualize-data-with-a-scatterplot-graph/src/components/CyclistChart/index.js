import React from 'react';
import styled from 'styled-components';
import ScaledD3Container from '../ScaledD3Container';
import dCyclistChart from './CyclistChart.d3';
import './CyclistChart.css';
import useDimensions from 'react-use-dimensions';

const FullScreenContainer = styled.div`
    padding: 10px;
    height: calc(100vh - ${({marginTop}) => `${marginTop}px`});
`;

const CyclistChart = () => {
    const [ref, {height}] = useDimensions();

    return (
        <>
            <h1 id='title' ref={ref}>Cycling Times</h1>
            <FullScreenContainer marginTop={height + 30}>
                <ScaledD3Container drawSvg={dCyclistChart} viewBox={{ width: 1600, height: 900 }} />
            </FullScreenContainer>
        </>
    );
};

export default CyclistChart;
