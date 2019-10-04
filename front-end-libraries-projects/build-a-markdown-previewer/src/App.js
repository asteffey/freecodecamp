import React, { useState } from 'react';
import Markdown from 'react-markdown/with-html';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';
import './App.css';

const initialMarkdown =
  '# Header 1\n' +
  'line \nbreaks \nare \nworking\n' +
  '## Header 2\n' +
  '[link](https://freecodecamp.org)\n' +
  '```\n' +
  'for (let i=0; i<Math.pow(2,1000); i++)\n' +
  '  console.log(\'this will take a really long time to execute, please don\\\'t try it...\');\n' +
  '```\n' +
  'This is a list\n' +
  '- of\n' +
  '- some\n' +
  '- **bold**\n' +
  '- stuff\n' +
  '- with `console.log(\'code\')`\n' +
  '> "Markdown is a text-to-HTML conversion tool for web writers" - John Gruber, inventor of Markdown.\n' +
  '![markdown](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)\n';


function App() {
  useFccTest({
    fccTest: FccTests.markdown_previewer
  });

  const [markdown, setMarkdown] = useState(initialMarkdown);

  const markdownWithBreaks = markdown;//.replace(/\n/g, '\n\n');

  return (
    <main>
      <textarea id="editor" value={markdown} onChange={e => setMarkdown(e.target.value)} />
      <div id="preview">
        <Markdown
          source={markdownWithBreaks}
          linkTarget='_blank'
          escapeHtml={false}
          plugins={[require('remark-breaks')]}
        />
      </div>

    </main>
  );
}

export default App;
