import { FETCHING_QUOTE, RECIEVE_QUOTE, RECEIVE_ERROR } from '../constants';

export const receiveQuote = (quote) => ({
    type: RECIEVE_QUOTE,
    quote: {
        author: quote.author,
        text: quote.quote
    }
});

export const retrieveQuote = (index) => dispatch => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch({
        type: FETCHING_QUOTE,
        cancel: () => { controller.abort(); }
    });

    fetch('quotes/' + index + '.json', { signal })
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: RECIEVE_QUOTE,
                quote: {
                    author: json.author,
                    text: json.quote
                }
            });
        })
        .catch(() => dispatch({ type: RECEIVE_ERROR }));
};