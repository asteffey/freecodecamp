import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

const useD3 = (fn) => {
    const ref = useRef();

    useEffect(
        () => fn(d3.select(ref.current)),
        [fn]
    );

    return ref;
};

export default useD3;