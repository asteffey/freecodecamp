export const FETCHING_QUOTE = "FETCHING_QUOTE";
export const RECIEVE_QUOTE = "RECEIVE_QUOTE";
export const RECEIVE_ERROR = "RECEIVE_ERROR";

export const receiveQuote = (quote) => ({
    type: RECIEVE_QUOTE,
    quote: {
        author: quote.author,
        text: quote.quote
    }
});

export const retrieveQuote = (index) => dispatch => {
    dispatch({ type: FETCHING_QUOTE });

    fetch('quotes/' + index + '.json')
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

export const retrieveRandomQuote = () => {
    let index = Math.floor(Math.random() * (2274 + 1));
    return retrieveQuote(index);
}