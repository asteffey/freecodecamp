import { combineReducers } from 'redux';
import quote from './quote';
import hasError from './hasError';
import nextId from './nextId';
import cancel from './cancel';

export default combineReducers({
    quote,
    hasError,
    nextId,
    cancel
});