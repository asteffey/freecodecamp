import { useState, useCallback, useEffect } from 'react';
import useTimer from './useTimer';

const Status = {
    session: 'Session',
    break: 'Break'
};

function pad(num) {
    return String(num).padStart(2, '0');
}

const defaultSettings = { 
    session: {
        min: 1,
        default: 25,
        max: 60
    },
    break: {
        min: 1,
        default: 5,
        max: 60
    }
};

const usePomodoro = (doAlarm, settings = defaultSettings) => {

    const [breakLength, setBreakLength] = useState(settings.break.default);
    const [sessionLength, setSessionLength] = useState(settings.session.default);
    const [status, setStatus] = useState(Status.session);
   
    const toggleStatus = useCallback(
        () => {
            setStatus(prev => {
                const res = prev === Status.session ? Status.break : Status.session;
                return res;
            });
        },
        [setStatus]
    );

    const { toggle, restart, pause, reset: resetTimer, timeLeft, setTimerDuration, minutes, seconds } = useTimer(sessionLength * 60);

    const setLength = useCallback((type) => (value) => {
        const setCurrent = type === 'break' ? setBreakLength : setSessionLength;
        const { min, max } = settings[type];
        const isOnType = Status[type] === status;

        setCurrent(oldValue => {
            const newValue = typeof value === 'number' ? value : value(oldValue);

            if (min <= newValue && newValue <= max) {
                if (isOnType) {
                    setTimerDuration(newValue * 60);
                }
                return newValue;
            } else {
                return oldValue;
            }
        });
    }, [status, settings, setTimerDuration]);

    const reset = useCallback(() => {
        setBreakLength(settings.break.default);
        setSessionLength(settings.session.default);
        resetTimer(settings.session.default * 60);
        setStatus(Status.session);
    }, [settings, resetTimer]);

    const [shouldExecute, setShouldExecute] = useState(true);
    useEffect(() => {
        if (timeLeft > 0 && !shouldExecute) {
            setShouldExecute(true);
        }
        else if (timeLeft === 0 && shouldExecute) {
            setShouldExecute(false);
            pause();
            doAlarm().then(() => {
                if (status === Status.session)
                    restart(breakLength * 60);
                else
                    restart(sessionLength * 60);

                toggleStatus();
            });
        }
    }, [timeLeft, doAlarm, toggleStatus, resetTimer, sessionLength, breakLength, shouldExecute, restart, pause, status]);

    const displayTime = `${pad(minutes)}:${pad(seconds)}`;
    
    return {
        breakLength: {
            ...settings.break,
            current: breakLength,
            set: setLength('break')
        },
        sessionLength: {
            ...settings.session,
            current: sessionLength,
            set: setLength('session')
        },
        status,
        displayTime,
        toggle,
        reset
    };
};

export default usePomodoro;
