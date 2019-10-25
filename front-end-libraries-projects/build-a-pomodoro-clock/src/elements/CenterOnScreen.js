import styled from 'styled-components';
import CenterContent from './CenterContent';

const CenterOnScreen = styled(CenterContent)`
    height: 100vh;
    background-color: ${({theme}) => theme.colors.grey.background}
`;

export default CenterOnScreen;