import React from 'react';
import Quote from './Quote';
import NewQuoteButton from './NewQuoteButton';
import TweetButton from '../TweetButton';
import useFetchQuote from '../../hooks/useFetchQuote';

export default ({ match: { params: { id } } }) => {
    useFetchQuote(id);

    return (
        <div id="quote-box">
            <Quote />
            <footer>
                <NewQuoteButton />
                <TweetButton />
            </footer>
        </div>
    );
};