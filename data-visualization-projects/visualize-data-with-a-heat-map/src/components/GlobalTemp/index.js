import React from 'react';
import styled from 'styled-components';
import ScaledD3Container from '../ScaledD3Container';
import d3Chart from './d3';
import './style.css';
import useDimensions from 'react-use-dimensions';

const FullScreenContainer = styled.div`
    padding: 10px;
    height: calc(100vh - ${({marginTop}) => `${marginTop}px`});
`;

const GlobalTemp = () => {
    const [ref, {height}] = useDimensions();

    return (
        <>
            <h1 id='title' ref={ref}>Average Global Temperature</h1>
            <h3 id='description' ref={ref}>Average Global Land-Surface Temperatures from 1753 to 2015</h3>
            <FullScreenContainer marginTop={height + 30}>
                <ScaledD3Container drawSvg={d3Chart} viewBox={{ width: 1600, height: 900 }} />
            </FullScreenContainer>
        </>
    );
};

export default GlobalTemp;
