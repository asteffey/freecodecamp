import React from 'react';
import { NavLink } from 'react-router-dom';

export default ({ isLoading, nextId }) => (
    <NavLink id="new-quote" to={`/${nextId}`}>New Quote</NavLink>
);