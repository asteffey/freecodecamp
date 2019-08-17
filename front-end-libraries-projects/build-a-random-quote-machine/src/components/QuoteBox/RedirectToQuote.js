import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectToQuote = ({ quoteId }) => (
    <Redirect to={`/${quoteId}`} />
);

export default RedirectToQuote;