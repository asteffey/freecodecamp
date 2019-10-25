import { useState, useCallback, useRef } from 'react';

const useTimer = (intialDuration) => {

    const intervalRef = useRef();

    const pause = useCallback(
        () => {
            console.log('pause');
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = undefined;
            }
        },
        [intervalRef]
    );

    const [timer, setTimer] = useState(intialDuration);

    const decrement = () => {
        setTimer(prev => {
            if (prev > 0) {
                if (prev === 1) {
                    pause();
                    console.log('DONE!');
                }
                return prev - 1;
            } else {
                return prev;
            }
        });
    };

    const setDuration = useCallback(
        seconds => setTimer(Math.max(seconds, 0)),
        [setTimer]
    );

    const incrementDuration = useCallback(
        seconds => setTimer(prev => prev + seconds),
        [setTimer]
    );

    const decrementDuration = useCallback(
        seconds => setTimer(prev => Math.max(prev - seconds, 0)),
        [setTimer]
    );

    const reset = useCallback(
        (seconds) => {
            console.log('reset');
            pause();
            setDuration(seconds);
        },
        [pause, setDuration]
    );
    
    const start = (seconds) => {
        console.log('start');
        if (typeof seconds === 'number') {
            setDuration(seconds);
            console.log('start setting to ' + seconds);
            intervalRef.current = setInterval(() => decrement(), 1000);
        } else if (timer > 0) {
            intervalRef.current = setInterval(() => decrement(), 1000);
        }
    };

    const toggle = () => {
        console.log('toggle');
        if (intervalRef.current) {
            pause();
        } else {
            start();
        }
    };

    return {
        start,
        pause,
        toggle,
        reset,
        incrementDuration,
        decrementDuration,
        timer,
        minutes: Math.floor(timer / 60),
        seconds: timer % 60
    };
};

export default useTimer;
