import styled from 'styled-components';
import { Header, H2 as BootStrapH2 } from '@bootstrap-styled/v4';

export { Header };

export const FullScreen = styled.div`
    width: 100vw;
    height: 100vh;
`;

export const EditorDiv = styled.div`
    display: grid;
    border: 1px solid black;
`;

export const CodeArea = styled.textarea`
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    resize: none;
    /* overflow: visible; */
`;

export const PreviewDiv = styled.div`
    display: grid;
    overflow: auto;    
    padding: 5px;
    border: 1px solid black;
`;

export const H2 = styled(BootStrapH2)`
    text-align: ${({ textAlign }) => textAlign || 'inherit'};
`;
