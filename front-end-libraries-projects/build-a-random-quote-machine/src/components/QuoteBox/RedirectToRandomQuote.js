import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default () => {
    const quoteId = useSelector(state => state.nextId);
    
    return (
        <Redirect to={`/${quoteId}`} />
    );
};