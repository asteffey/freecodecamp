import { FETCHING_QUOTE, RECIEVE_QUOTE, RECEIVE_ERROR } from '../constants';

const hasError = (state = false, action) => {
    switch (action.type) {
    case RECEIVE_ERROR:
        return true;
    case FETCHING_QUOTE:
    case RECIEVE_QUOTE:
        return false;
    default:
        return state;
    }
};

export default hasError;