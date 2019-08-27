import { combineReducers } from 'redux';
import quote from './quote';
import status from './status';
import nextId from './nextId';
import cancel from './cancel';

export default combineReducers({
    quote,
    status,
    nextId,
    cancel
});