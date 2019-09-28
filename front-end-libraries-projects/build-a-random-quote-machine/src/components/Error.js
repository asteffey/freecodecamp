import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Error = () => {
    return <div className="error"><FontAwesomeIcon icon={faExclamationTriangle} color="red" size="2x" /></div>;
};

export default Error;