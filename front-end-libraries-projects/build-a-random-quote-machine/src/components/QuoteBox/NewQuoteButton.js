import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NewQuoteButton = ({ nextId }) => {

    return (
        <Link id="new-quote" to={`/${nextId}`}>New Quote</Link>
    );
};

NewQuoteButton.propTypes = {
    nextId: PropTypes.number.isRequired
};

export default NewQuoteButton;