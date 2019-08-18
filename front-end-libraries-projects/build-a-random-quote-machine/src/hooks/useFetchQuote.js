import { retrieveQuote } from '../actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveQuote(id));
    }, [dispatch, id]);
};