import React from 'react';
import PropTypes from 'prop-types';

const TweetButton = (props) => {
    const { tweet, children = 'Tweet', ...otherProps } = props;
    const enabled = !!(tweet);
    
    let attributes;
    if (enabled)
        attributes = {
            rel: 'noopener noreferrer',
            target: '_blank',
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`
        };
    else
        attributes = {
            style: { pointerEvents: 'none', cursor: 'default' },
            href: '#'
        };

    return (
        <a {...otherProps} {...attributes}>{children}</a>
    );
};

TweetButton.propTypes = {
    tweet: PropTypes.string,
    children: PropTypes.any
};

export default TweetButton;