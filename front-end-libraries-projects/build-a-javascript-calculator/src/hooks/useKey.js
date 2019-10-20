import { useCallback, useEffect } from 'react';

const canUseDOM = !!(
    (typeof window !== 'undefined' &&
        window.document && window.document.createElement)
);

const useKey = (handler, keys) => {
    const onKeyDown = useCallback(
        ({ key }) => {
            if (keys.includes(key)) {
                handler(key);
            }
        },
        [keys]);

    useEffect(() => {
        if (!canUseDOM) {
            console.error('window is not defined');
            return null;
        }

        window.document.addEventListener('keydown', onKeyDown);
        return () => {
            window.document.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);
};



export default useKey;
