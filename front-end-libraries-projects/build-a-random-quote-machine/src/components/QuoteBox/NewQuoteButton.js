import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default () => {
    const nextId = useSelector(state => state.nextId);

    return (
        <NavLink id="new-quote" to={`/${nextId}`}>New Quote</NavLink>
    );
};