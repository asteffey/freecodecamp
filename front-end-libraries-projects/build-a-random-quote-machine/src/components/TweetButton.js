import React from 'react';

export default () => (
    <a id="tweet-quote" href={`https://twitter.com/intent/tweet?url=${window.location.href}`}>Tweet Quote</a>
);