import { FETCHING_QUOTE } from '../constants';

const getRandomQuoteId = () => Math.floor(Math.random() * (2274 + 1));

export default (state = getRandomQuoteId(), action) => {
    switch (action.type) {
        case FETCHING_QUOTE:
            return getRandomQuoteId();
        default:
            return state;
    }
};