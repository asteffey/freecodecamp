import { createStore, applyMiddleware } from "redux";
import asyncReducer from "./reducers";
import thunk from "redux-thunk";

export const store = createStore(asyncReducer, applyMiddleware(thunk));

export default store;