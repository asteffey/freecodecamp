import React, { useState } from 'react';
import Markdown from 'react-markdown/with-html';
import { initialMarkdown } from './constants';

const MarkdownEditor = () => {

    const [markdown, setMarkdown] = useState(initialMarkdown);

    return (
        <div id="markdown-editor">
            <textarea id="editor" value={markdown} onChange={e => setMarkdown(e.target.value)} autoFocus />
            <div id="preview">
                <Markdown
                    source={markdown}
                    linkTarget='_blank'
                    escapeHtml={false}
                    plugins={[require('remark-breaks')]}
                />
            </div>
        </div>
    );
};

export default MarkdownEditor;
