export const FETCHING_QUOTE = "FETCHING_QUOTE";
export const RECIEVE_QUOTE = "RECEIVE_QUOTE";
export const RECEIVE_ERROR = "RECEIVE_ERROR";
export const RETRIEVE_RANDOM_QUOTE = "RETRIEVE_RANDOM_QUOTE";

export const retrieveRandomQuote = () => ({
    type: RETRIEVE_RANDOM_QUOTE
});

export const fetchingQuote = () => ({
    type: FETCHING_QUOTE
});

export const receiveQuote = (quote) => ({
    type: RECIEVE_QUOTE,
    quote: {
        author: quote.author,
        text: quote.quote
    }
});

export const receiveError = () => ({
    type: RECEIVE_ERROR
});

export const retrieveQuote = (index) => dispatch => {
    dispatch(fetchingQuote());
    fetch('quotes/'+index+'.json').then(response => {
        return response.json();
    }, err => {
        dispatch(receiveError());
    }).then(json => {
        dispatch(receiveQuote(json));
    });
};