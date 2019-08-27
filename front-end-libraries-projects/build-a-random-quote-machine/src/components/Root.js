import React from 'react';
import store from '../store';
import { Provider } from 'react-redux';
import App from './App';

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default Root;
