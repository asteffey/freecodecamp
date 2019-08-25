import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NewQuoteButton = ({ nextId }) => {

    return (
        <NavLink id="new-quote" to={`/${nextId}`}>New Quote</NavLink>
    );
};

NewQuoteButton.propTypes = {
    nextId: PropTypes.number.isRequired
};

export default NewQuoteButton;