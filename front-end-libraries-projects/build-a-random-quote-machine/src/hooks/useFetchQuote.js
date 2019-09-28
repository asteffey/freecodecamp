import { retrieveQuote } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveQuote(id));
    }, [dispatch, id]);

    const { nextId, hasError, quote: { text, author } } = useSelector(state => state);

    return { text, author, hasError, nextId };
};