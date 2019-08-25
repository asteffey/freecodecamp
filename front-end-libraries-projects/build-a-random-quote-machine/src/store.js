import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';

export const createMyStore = () => createStore(reducer, applyMiddleware(thunk));

export default createMyStore();