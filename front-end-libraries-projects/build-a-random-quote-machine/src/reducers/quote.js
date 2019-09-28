import { RECIEVE_QUOTE, FETCHING_QUOTE, RECEIVE_ERROR } from '../constants';

const quote = (state = {}, action) => {
    switch (action.type) {
    case RECIEVE_QUOTE:
        return { ...action.quote };
    case FETCHING_QUOTE:
    case RECEIVE_ERROR:
        return {};
    default:
        return state;
    }
};

export default quote;