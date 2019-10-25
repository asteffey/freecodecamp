import React, {useCallback, useRef} from 'react';
import usePomodoro from '../../hooks/usePomodoro';

const Pomodoro = () => {

    const audio = useRef();

    const doAlarm = useCallback(()=>{
        audio.current.play();
    }, [audio]);

    const {breakLength, incrementBreak, decrementBreak, sessionLength, incrementSession, decrementSession, timeLeft, status, toggle, reset} = usePomodoro(doAlarm);

    const resetEverything = useCallback(()=> {
        audio.current.pause();
        audio.current.currentTime = 0;
        reset();
    }, [audio, reset]);

    return (
        <div>
            <div>
                <label id='break-label' htmlFor='break-length'>Break Length</label>
                <div id='break-length'>{breakLength}</div>
                <button id='break-increment' onClick={incrementBreak}>Increment</button>
                <button id='break-decrement' onClick={decrementBreak}>Decrement</button>
            </div>
            <div>
                <label id='session-label' htmlFor='session-length'>Session Length</label>
                <div id='session-length'>{sessionLength}</div>
                <button id='session-increment' onClick={incrementSession}>Increment</button>
                <button id='session-decrement' onClick={decrementSession}>Decrement</button>
            </div>
            <div id='time-left'>{timeLeft}</div>
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