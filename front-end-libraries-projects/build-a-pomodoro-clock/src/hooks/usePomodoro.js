import { useState, useCallback, useEffect } from 'react';
import useCounter from './useCounter';
import useTimer from './useTimer';

const Status = {
    Session: 'Session',
    Break: 'Break'
};

function pad(num) {
    return String(num).padStart(2, '0');
}

const defaultSettings = { defaultBreak: 5, defaultSession: 25, maxBreak: 60, maxSession: 60 };

const usePomodoro = (doAlarm, settings = defaultSettings) => {
    const [breakLength, incrementBreak, decrementBreak, setBreak] = useCounter(settings.defaultBreak, settings.maxBreak);
    const [sessionLength, incrementSession, decrementSession, setSession] = useCounter(settings.defaultSession, settings.maxSession);
       
    const [status, setStatus] = useState(Status.Session);
    const toggleStatus = useCallback(
        () => setStatus(prev => prev === Status.Session ? Status.Break : Status.Session),
        [setStatus]
    );

    const { toggle, start, reset: resetTimer, incrementDuration, decrementDuration, timer, minutes, seconds } = useTimer(sessionLength * 60);

    const reset = useCallback(() => {
        setBreak(settings.defaultBreak);
        setSession(settings.defaultSession);
        resetTimer(settings.defaultSession * 60);
        setStatus(Status.Session);
    }, [settings, setBreak, setSession, resetTimer]);

    const [foo, setFoo] = useState(true);
    
    useEffect(() => {
        if (timer === 0 && foo) {
            setFoo(false);
            console.log('timer is zero!!!!!!!!!');
            doAlarm();
            setTimeout(() => {                
                toggleStatus();

                if (status === Status.Session)
                    start(breakLength * 60);
                else
                    start(sessionLength * 60);
                
                setFoo(true);
            }, 1000);
        }
    }, [timer, doAlarm, toggleStatus, resetTimer, sessionLength, breakLength, foo, start, status]);

    const timeLeft = `${pad(minutes)}:${pad(seconds)}`;

    
    return {
        breakLength,
        incrementBreak: () => {
            if (status === Status.Break && sessionLength > 1) {
                incrementDuration(60);
            }
            incrementBreak();
        },
        decrementBreak: () => {
            if (status === Status.Break && sessionLength > 1) {
                decrementDuration(60);
            }
            decrementBreak();
        },
        sessionLength,
        incrementSession: () => {
            if (status === Status.Session && sessionLength > 1) {
                incrementDuration(60);
            }
            incrementSession();
        },
        decrementSession: () => {
            if (status === Status.Session && sessionLength > 1) {
                decrementDuration(60);
            }
            decrementSession();
        },
        status,
        timeLeft,
        toggle,
        reset
    };    
};

export default usePomodoro;
