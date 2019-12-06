import React, {useCallback, useRef} from 'react';
import usePomodoro from '../../hooks/usePomodoro';

const Pomodoro = () => {

    const audio = useRef();

    const doAlarm = useCallback(() => audio.current.play(), [audio]);

    const {breakLength, sessionLength, displayTime, status, toggle, reset} = usePomodoro(doAlarm);

    const resetEverything = useCallback(()=> {
        audio.current.pause();
        audio.current.currentTime = 0;
        reset();
    }, [audio, reset]);

    const incrementBreak = () => breakLength.set(oldValue => Math.min(oldValue + 1, breakLength.max));
    const decrementBreak = () => breakLength.set(oldValue => Math.max(oldValue - 1, breakLength.min));
    const incrementSession = () => sessionLength.set(oldValue => Math.min(oldValue + 1, sessionLength.max));
    const decrementSession = () => sessionLength.set(oldValue => Math.max(oldValue - 1, sessionLength.min));

    return (
        <div>
            <div>
                <label id='break-label' htmlFor='break-length'>Break Length</label>
                <div id='break-length'>{breakLength.current}</div>
                <button id='break-increment' onClick={incrementBreak}>Increment</button>
                <button id='break-decrement' onClick={decrementBreak}>Decrement</button>
            </div>
            <div>
                <label id='session-label' htmlFor='session-length'>Session Length</label>
                <div id='session-length'>{sessionLength.current}</div>
                <button id='session-increment' onClick={incrementSession}>Increment</button>
                <button id='session-decrement' onClick={decrementSession}>Decrement</button>
            </div>
            <div id='time-left'>{displayTime}</div>
            <label id='timer-label'>{status}</label>
            <button id='start_stop' onClick={toggle}>Start/Stop</button>
            <button id='reset' onClick={resetEverything}>Reset</button>
            <audio id="beep" preload="auto" 
                src='https://goo.gl/65cBl1'
                ref={audio} />
        </div>
    );
};

export default Pomodoro;