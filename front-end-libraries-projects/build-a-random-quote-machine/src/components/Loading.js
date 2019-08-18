import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default ({isLoading, hasError, children}) => {
    if (isLoading)
        return <div className='centerContent'><FontAwesomeIcon icon={faSync} spin /></div>;
    else if (hasError)
        return <div className='centerContent'><FontAwesomeIcon icon={faExclamationTriangle} /></div>;
    else
        return children;
};