import React from 'react';

export default (props) => {
    const { tweet, children = 'Tweet', ...otherProps } = props;
    const enabled = !!(tweet);
    
    let attributes;
    if (enabled)
        attributes = {
            rel: 'noopener noreferrer',
            target: '_blank',
            href: encodeURI(`https://twitter.com/intent/tweet?text=${tweet}`)
        }
    else
        attributes = {
            style: { pointerEvents: 'none', cursor: 'default' },
            href: '#'
        }

    return (
        <a {...otherProps} {...attributes}>{children}</a>
    );
};
