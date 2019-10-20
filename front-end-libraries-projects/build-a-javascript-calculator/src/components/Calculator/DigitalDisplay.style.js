import styled from 'styled-components';

const DigitalDisplay = styled.div`
    margin: 4px;
    padding: 4px;
    background: #010;
    color: #3C3;
    font-family: 'Digital';
    line-height: 1;
    text-align: right;
    overflow-wrap: break-word;
    font-size: ${({size}) => size === 'big' ? '24px' : '16px'};
    @media (orientation: portrait) {
        width: 184px;
    }
    @media (orientation: landscape) {
        width: 234px;
    }
`;

export default DigitalDisplay;
