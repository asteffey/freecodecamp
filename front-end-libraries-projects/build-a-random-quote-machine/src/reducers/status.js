import { FETCHING_QUOTE, RECIEVE_QUOTE, RECEIVE_ERROR } from '../constants';
import { combineReducers } from 'redux';

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

const isLoading = (state = true, action) => {
    switch (action.type) {
    case FETCHING_QUOTE:
        return true;
    case RECIEVE_QUOTE:
    case RECEIVE_ERROR:
        return false;
    default:
        return state;
    }
};

export default combineReducers({isLoading, hasError});