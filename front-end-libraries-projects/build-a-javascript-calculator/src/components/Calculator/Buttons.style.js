import styled from 'styled-components';

const Buttons = styled.div`
    display: grid;
    justify-items: stretch;
    align-items: stretch;
    @media (orientation: portrait) {
        grid-template-columns: repeat(4, 50px);
        grid-template-rows: repeat(5, 50px);
        grid-template-areas:
            "clear open-parenthesis close-parenthesis exponent"
            "seven eight nine add"
            "four five six subtract"
            "one two three multiply"
            "zero decimal equals divide";
    }
    @media (orientation: landscape) {
        grid-template-columns: repeat(5, 50px);
        grid-template-rows: repeat(4, 50px);
        grid-template-areas:
            "seven eight nine add clear"
            "four five six subtract open-parenthesis"
            "one two three multiply close-parenthesis"
            "zero decimal equals divide exponent";
    }    
`;

export default Buttons;
