import React from 'react';
import { NavLink } from 'react-router-dom';

export default ({ nextId }) => {

    return (
        <NavLink id="new-quote" to={`${nextId}`}>New Quote</NavLink>
    );
};