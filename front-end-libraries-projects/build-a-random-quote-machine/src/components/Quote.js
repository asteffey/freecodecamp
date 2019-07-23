import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Quote = ({ status, quote }) => {
    if (status.isLoading)
        return <div><FontAwesomeIcon icon={faSync} spin /></div>;
    else if (status.hasError)
        return <div><FontAwesomeIcon icon={faExclamationTriangle} /></div>;
    else return (
        <div>
            <p id="text">{quote.text}</p>
            <p id="author">{quote.author}</p>
        </div>
    );
};

export default Quote;