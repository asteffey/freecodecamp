import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Quote from './Quote';
import NewQuoteButton from './NewQuoteButton';
import TweetButton from '../TweetButton';
import useFetchQuote from '../../hooks/useFetchQuote';
import Loading from '../Loading';

const QuoteBox = ({ id }) => {
    const { text, author, isLoading, hasError, nextId } = useFetchQuote(id);
    const tweet = (!isLoading && !hasError) ? `${text} - ${author}` : null;

    useEffect(() => {
        document.title = `Quote #${id}`;
    }, [id]);

    return (
        <div id="quote-box">
            <Loading isLoading={isLoading} hasError={hasError}>
                <Quote text={text} author={author} />
            </Loading>
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