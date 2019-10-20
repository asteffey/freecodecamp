import { useCallback, useEffect } from 'react';

const useKey = (handler, keys) => {
    const onKeyDown = useCallback(
        ({ key }) => {
            console.log(keys + ' has ' + key + '?');
            if (keys.includes(key)) {
                handler(key);
            }
        },
        [keys]);

    useEffect(() => {
        window.document.addEventListener('keydown', onKeyDown);
        return () => {
            window.document.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);
};



export default useKey;
