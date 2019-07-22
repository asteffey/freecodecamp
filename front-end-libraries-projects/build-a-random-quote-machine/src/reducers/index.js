import { combineReducers } from 'redux'
import quote from './quote'
import status from './status'

export default combineReducers({
    quote,
    status
})