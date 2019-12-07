import { useCallback, useRef, useReducer } from 'react';

const actions = {
    START: 'START',
    PAUSE: 'PAUSE',
    INCREMENT: 'INCREMENT',
    RESTART: 'RESTART',
    RESET: 'RESET',
    SET_DURATION: 'SET_DURATION',
};

const initialState = { timer: 0, duration: 0, isRunning: false };
export const reducer = (state, {type, newDuration}) => {
    const {timer, duration, isRunning} = state;
    switch (type) {
    case actions.START:
    case actions.PAUSE:
        return {
            ...state,
            isRunning: type === actions.START
        };
    case actions.INCREMENT:
        return {
            timer: Math.min(timer + 1, duration), 
            duration,
            isRunning: timer + 1 < duration
        };
    case actions.RESTART:
    case actions.RESET:
        return {
            timer: 0, 
            duration: typeof newDuration === 'number' ? newDuration : duration,
            isRunning: type === actions.RESTART
        };
    case actions.SET_DURATION:
        return {
            timer: Math.min(timer, newDuration), 
            duration: newDuration,
            isRunning
        };
    default:
        return state;
    }
};

const useTimer = (intialDuration) => {

    const intervalRef = useRef();
 
    const [{ timer, duration, isRunning }, dispatch] = useReducer(reducer, { ...initialState, duration: intialDuration });
    
    const setTimerDuration = newDuration => {
        dispatch({ type: actions.SET_DURATION, newDuration });
    };

    const increment = useCallback(
        () => dispatch({ type: actions.INCREMENT }),
        []
    );

    const stopInterval = useCallback(
        () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = undefined;
            }
        },
        [intervalRef]
    );

    const startInterval = useCallback(
        () => {
            stopInterval();
            intervalRef.current = setInterval(() => increment(), 1000);
        },
        [stopInterval, intervalRef, increment]
    );

    const start = useCallback(
        () => {
            startInterval();
            dispatch({ type: actions.START });
        },
        [startInterval]
    );

    const pause = useCallback(
        () => {
            stopInterval();
            dispatch({ type: actions.PAUSE });
        },
        [stopInterval]
    );

    const toggle = useCallback(
        () => {
            if (intervalRef.current) {
                pause();
            } else {
                start();
            }
        },
        [pause, start]
    );
    
    const restart = useCallback(
        (newDuration) => {
            startInterval();
            dispatch({ type: actions.RESTART, newDuration: newDuration });
        },
        [startInterval]        
    );

    const reset = useCallback(
        (newDuration) => {
            stopInterval();
            dispatch({ type: actions.RESET, newDuration: newDuration });
        },
        [stopInterval]
    );

    const timeLeft = duration - timer;

    return {
        start,
        pause,
        toggle,
        restart,
        reset,
        setTimerDuration,
        timeLeft,
        minutes: Math.floor(timeLeft / 60),
        seconds: timeLeft % 60,
        isRunning
    };
};

export default useTimer;
