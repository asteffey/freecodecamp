import { retrieveQuote } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveQuote(id));
    }, [dispatch, id]);

    const nextId = useSelector(state => state.nextId);
    const { isLoading, hasError } = useSelector(state => state.status);
    const { text, author } = useSelector(state => state.quote);

    return { text, author, isLoading, hasError, nextId };
};