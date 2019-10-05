import React from 'react';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';
import MarkdownEditor from './components/MarkdownEditor';

function App() {
    useFccTest({
        fccTest: FccTests.markdown_previewer
    });

    return (
        <main>
            <MarkdownEditor />
        </main>
    );
}

export default App;
