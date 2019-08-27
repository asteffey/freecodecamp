import { FETCHING_QUOTE, NUMBER_QUOTES } from '../constants';

const getRandomQuoteId = () => Math.floor(Math.random() * (NUMBER_QUOTES + 1));

export default (state = getRandomQuoteId(), action) => {
    switch (action.type) {
    case FETCHING_QUOTE:
        return getRandomQuoteId();
    default:
        return state;
    }
};