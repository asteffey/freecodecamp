import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Quote from './Quote';
import NewQuoteButton from './NewQuoteButton';
import TweetButton from '../TweetButton';
import useFetchQuote from '../../hooks/useFetchQuote';
import Error from '../Error';

const QuoteBox = ({ id }) => {
    const { text, author, hasError, nextId } = useFetchQuote(id);
    const tweet = (text && author) ? `${text} - ${author}` : null;

    useEffect(() => {
        document.title = `Quote #${id}`;
    }, [id]);

    return (
        <div id="quote-box">
            {!hasError && <Quote text={text} author={author} />}
            {hasError && <Error/> }           
            <footer>
                <NewQuoteButton nextId={nextId} />
                <TweetButton id="tweet-quote" tweet={tweet} label='Tweet Quote' />
            </footer>
        </div>
    );
};

QuoteBox.propTypes = {
    id: PropTypes.number.isRequired
};

export default QuoteBox;