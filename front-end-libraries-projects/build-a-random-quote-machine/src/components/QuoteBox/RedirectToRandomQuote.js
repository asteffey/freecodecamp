import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default () => {
    const quoteId = useSelector(state => state.nextId);
    React.useEffect(()=>{
        console.log(`Redirecting to ${quoteId}`);
    });
    
    return (
        <Redirect to={`/${quoteId}`} />
    );
};