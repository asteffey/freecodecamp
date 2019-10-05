import React from 'react';
import PropTypes from 'prop-types';
import { EditorDiv, CodeArea } from './style';


const Editor = ({ markdown, setMarkdown }) => (
    <EditorDiv>
        <CodeArea id="editor" value={markdown} onChange={e => setMarkdown(e.target.value)} autoFocus />
    </EditorDiv>
);

Editor.propTypes = {
    markdown: PropTypes.string,
    setMarkdown: PropTypes.func
};

export default Editor;

