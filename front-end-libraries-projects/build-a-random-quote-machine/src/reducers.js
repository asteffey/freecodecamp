import { FETCHING_QUOTE, RECIEVE_QUOTE, RECEIVE_ERROR } from "./actions/fetchQuote"

const initialState = {
    quote: "",
    author: ""
};

const asyncReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECIEVE_QUOTE:
            console.log(action.quote);
            return {
                quote: action.quote,
                author: action.author
            }

        case FETCHING_QUOTE:
        case RECEIVE_ERROR:
        default:
            return state;
    }
};

export default asyncReducer;