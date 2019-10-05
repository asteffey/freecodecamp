import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown/with-html';
import { PreviewDiv } from './style';

const Preview = ({ markdown }) => (
    <PreviewDiv id="preview">
        <Markdown
            source={markdown}
            linkTarget='_blank'
            escapeHtml={false}
            plugins={[require('remark-breaks')]}
        />
    </PreviewDiv>
);

Preview.propTypes = {
    markdown: PropTypes.string
};

export default Preview;