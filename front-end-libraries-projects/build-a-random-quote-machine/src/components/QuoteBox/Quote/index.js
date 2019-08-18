import React from 'react';
import { useSelector } from 'react-redux';
import Quote from './Quote';
import Loading from '../../Loading';

export default () => {
    const status = useSelector(state => state.status);
    const quote = useSelector(state => state.quote);

    return (
        <Loading {...status}>
            <Quote {...quote} />
        </Loading>
    );

};