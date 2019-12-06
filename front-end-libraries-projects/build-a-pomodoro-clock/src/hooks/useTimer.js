import { useCallback, useRef, useReducer } from 'react';

const actions = {
    INCREMENT: 'INCREMENT',
    RESET: 'RESET',
    SET_DURATION: 'SET_DURATION',
};

export const reducer = (state, {type, newDuration}) => {
    const {timer, duration} = state;
    switch (type) {
    case actions.INCREMENT:
        return {
            timer: Math.min(timer + 1, duration), 
            duration
        };
    case actions.RESET:
        return {
            timer: 0, 
            duration: typeof newDuration === 'number' ? newDuration : duration
        };
    case actions.SET_DURATION:
        return {
            timer: Math.min(timer, newDuration), 
            duration: newDuration
        };
    default:
        return state;
    }
};

const useTimer = (intialDuration) => {

    const intervalRef = useRef();

    const pause = useCallback(
        () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = undefined;
            }
        },
        [intervalRef]
    );

    const [{ timer, duration }, dispatch] = useReducer(reducer, { timer: 0, duration: intialDuration });
    
    const setTimerDuration = newDuration => {
        dispatch({ type: actions.SET_DURATION, newDuration });
    };

    const increment = () => {
        dispatch({ type: actions.INCREMENT });
    };

    const reset = useCallback(
        (newDuration) => {
            pause();
            dispatch({ type: actions.RESET, newDuration: newDuration });
        },
        [pause]
    );
    
    const start = () => {
        pause();
        intervalRef.current = setInterval(() => increment(), 1000);
    };

    const restart = (newDuration) => {
        reset(newDuration);
        intervalRef.current = setInterval(() => increment(), 1000);
    };

    const toggle = () => {
        if (intervalRef.current) {
            pause();
        } else {
            start();
        }
    };

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
        seconds: timeLeft % 60
    };
};

export default useTimer;
