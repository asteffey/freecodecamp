import React from 'react';
import NextQuoteButton from '../containers/NextQuoteButton';
import DisplayQuote from '../containers/DisplayQuote';
import TweetButton from './TweetButton';

export default () => (
    <div id="quote-box">
        <DisplayQuote />
        <footer>
            <NextQuoteButton />
            <TweetButton />
        </footer>
    </div>
);