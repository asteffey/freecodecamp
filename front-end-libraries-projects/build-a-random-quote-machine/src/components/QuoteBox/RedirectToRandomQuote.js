import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const RedirectToRandomQuote = () => {
    const quoteId = useSelector(state => state.nextId);
    
    return (
        <Redirect to={`/${quoteId}`} />
    );
};

export default RedirectToRandomQuote;