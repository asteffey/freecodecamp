import styled from 'styled-components';

const SideBySide = styled.div`
    display: grid;
    height: calc(100vh - 52px);
    @media (orientation: portrait) {
        grid-template-columns: 100%;
        grid-template-rows: 50%;
    }
    @media (orientation: landscape) {
        grid-template-columns: 50% 50%;
        grid-template-rows: 100%;
    }   
`;

export default SideBySide;