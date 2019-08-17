import React from 'react';
import Quote from './Quote';
import NewQuoteButton from './NewQuoteButton';
import TweetButton from '../TweetButton';

export default () => (
    <div id="quote-box">
        <Quote />
        <footer>
            <NewQuoteButton />
            <TweetButton />
        </footer>
    </div>
);