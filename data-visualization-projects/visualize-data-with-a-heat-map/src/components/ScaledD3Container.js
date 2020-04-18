import React, { useCallback } from 'react';
import useD3 from '../hooks/useD3';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SvgContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    svg {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

const ScaledD3Container = ({ drawSvg, viewBox: { width = 100, height = 100 } }) => {
    const draw = useCallback(container => {
        const svg = container.append('svg')
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('viewBox', `0 0 ${width} ${height}`);

        drawSvg(svg, width, height);
    }, [drawSvg, width, height]);
    
    const ref = useD3(draw);

    return (
        <SvgContainer ref={ref} />
    );
};

ScaledD3Container.propTypes = {
    drawSvg: PropTypes.func.isRequired,
    viewBox: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    })
};

export default ScaledD3Container;