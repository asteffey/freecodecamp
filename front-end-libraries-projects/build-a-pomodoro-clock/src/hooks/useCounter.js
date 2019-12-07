import { useState, useCallback } from 'react';

const useCounter = (initial, max) => {
    const [count, setCount] = useState(initial);

    const increment = useCallback(
        () => setCount(prev => prev < max ? prev + 1 : prev),
        [setCount, max]
    );
    
    const decrement = useCallback(
        () => setCount(prev => prev > 1 ? prev - 1 : prev),
        [setCount]
    );

    return [count, increment, decrement, setCount];
};

export default useCounter;
