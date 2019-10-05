import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useDimensions from 'react-use-dimensions';

const SideBySideDiv = styled.div`
    display: grid;
    grid-template-columns: ${({ isWider }) => isWider ? '50% 50%' : '100%'};
    grid-template-rows: ${({ isWider }) => isWider ? '100%' : '50% 50%'};
    height: calc(100vh - 52px);    
`;

const SideBySide = ({ children }) => {
    const [ref, { width, height }] = useDimensions();
    const isWider = width > height;

    return (
        <SideBySideDiv ref={ref} isWider={isWider}>
            {children}
        </SideBySideDiv>
    );
};

SideBySide.propTypes = {
    children: PropTypes.oneOf([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default SideBySide;