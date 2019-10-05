import React, { useState } from 'react';
import { initialMarkdown } from './constants';
import { FullScreen, Header, H2 } from './style';
import SideBySide from '../SideBySide';
import Editor from './Editor';
import Preview from './Preview';


const MarkdownEditor = () => {
    const [markdown, setMarkdown] = useState(initialMarkdown);

    return (
        <FullScreen id="markdown-editor">
            <Header><H2 textAlign='center'>Markdown Editor</H2></Header>
            <SideBySide>
                <Editor markdown={markdown} setMarkdown={setMarkdown} />
                <Preview markdown={markdown} />
            </SideBySide>
        </FullScreen>
    );
};

export default MarkdownEditor;
