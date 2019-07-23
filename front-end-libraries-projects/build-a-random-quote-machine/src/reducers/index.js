import { combineReducers } from 'redux'
import quote from './quote'
import status from './status'
import nextId from './nextId'

export default combineReducers({
    quote,
    status,
    nextId
})