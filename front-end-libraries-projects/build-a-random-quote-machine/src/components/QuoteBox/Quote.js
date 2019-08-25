import React from 'react';

export default ({ text, author }) => {
    return (
        <div>
            <p id="text">{text}</p>
            <p id="author">{author}</p>
        </div>
    );
};