import { FETCHING_QUOTE, RECIEVE_QUOTE, RECEIVE_ERROR } from '../constants';

export default (state = null, action) => {
    switch (action.type) {
    case FETCHING_QUOTE:
        if (state != null) state();
        return action.cancel;
    case RECIEVE_QUOTE:
    case RECEIVE_ERROR:
        return null;
    default:
        return state;
    }
};