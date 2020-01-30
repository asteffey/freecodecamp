import React from 'react';
import styled from 'styled-components';
import ScaledD3Container from '../ScaledD3Container';
import d3GdpChart from './GdpChart.d3';
import './GdpChart.css';
import useDimensions from 'react-use-dimensions';

const FullScreenContainer = styled.div`
    padding: 10px;
    height: calc(100vh - ${({marginTop}) => `${marginTop}px`});
`;

const GdpChart = () => {
    const [ref, {height}] = useDimensions();

    return (
        <>
            <h1 id='title' ref={ref}>U.S. Gross Domestic Product (GDP)</h1>
            <FullScreenContainer marginTop={height + 30}>
                <ScaledD3Container drawSvg={d3GdpChart} viewBox={{ width: 1600, height: 900 }} />
            </FullScreenContainer>
        </>
    );
};

export default GdpChart;
