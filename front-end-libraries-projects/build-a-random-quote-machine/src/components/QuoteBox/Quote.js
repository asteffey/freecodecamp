import React from 'react';
import PropTypes from 'prop-types';

const Quote = ({ text, author }) => {
    return (
        <div>
            <p id="text">{text}</p>
            <p id="author">{author}</p>
        </div>
    );
};

Quote.propTypes = {
    text: PropTypes.string,
    author: PropTypes.string
};

export default Quote;