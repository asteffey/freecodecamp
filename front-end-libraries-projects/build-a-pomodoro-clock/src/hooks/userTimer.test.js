import { renderHook, act } from '@testing-library/react-hooks';
import useTimer, { reducer } from './useTimer';

function tick(ticks) {
    ticks = typeof ticks === 'undefined' ? 1 : ticks;
    jest.advanceTimersByTime(ticks * 1000);
}

describe('useTimer', () => {
    const initialDuration = 120;
    const lowerDuration = 10;
    const higherDuration = 360;
    let timer;
    jest.useFakeTimers();

    beforeEach(() => {
        timer = renderHook(() => useTimer(initialDuration)).result;
    });

    afterEach(() => {
        act(() => timer.current.pause());
    });

    
    test('starts at initial', () => {
        act(() => timer.current.start());
        expect(timer.current.timeLeft).toBe(initialDuration);
    });

    test('restarts at new duration', () => {
        act(() => timer.current.restart(higherDuration));
        expect(timer.current.timeLeft).toBe(higherDuration);
    });

    describe('resets', () => {
        test('resets to new duration', () => {
            act(() => timer.current.reset(higherDuration));
            expect(timer.current.timeLeft).toBe(higherDuration);
        });

        test('paused after reset', () => {
            act(() => {
                timer.current.start();
                timer.current.reset();
                tick();
            });
            expect(timer.current.timeLeft).toBe(initialDuration);
        });

        test('resets after running', () => {
            act(() => {
                timer.current.start();
                tick();
                timer.current.reset();
            });
            expect(timer.current.timeLeft).toBe(initialDuration);
        });
        
        test('resets to new duration after running', () => {
            act(() => {
                timer.current.start();
                tick();
                timer.current.reset(higherDuration);
            });
            expect(timer.current.timeLeft).toBe(higherDuration);
        });
    });

    test('won\'t decrement without start', () => {
        act(() => {
            tick(1);
        });
        
        expect(timer.current.timeLeft).toBe(initialDuration);
    });

    test('won\'t decrement after pause', () => {        
        act(() => {
            timer.current.start();
            tick(1);
            timer.current.pause();
            tick(1);

        });
        
        expect(timer.current.timeLeft).toBe(initialDuration - 1);
    });
    
    test('decrements after 1s', () => {        
        act(() => {
            timer.current.start();
            tick(1);
        });
        
        expect(timer.current.timeLeft).toBe(initialDuration - 1);
    });

    test('decrement by 1 after 1s after double start', () => {        
        act(() => {
            timer.current.start();
            timer.current.start();
            tick(1);
        });
        
        expect(timer.current.timeLeft).toBe(initialDuration - 1);
    });

    test('decrement by 2 after 2s', () => {        
        act(() => {
            timer.current.start();
            tick(2);
        });
        
        expect(timer.current.timeLeft).toBe(initialDuration - 2);
    });

    test('will decrement to 0', () => {       
        act(() => {
            timer.current.start();
            tick(initialDuration);
        });
        
        expect(timer.current.timeLeft).toBe(0);
    });

    test('won\'t decrement below 0', () => {       
        act(() => {
            timer.current.start();
            tick(initialDuration + 1);
        });
        
        expect(timer.current.timeLeft).toBe(0);
    });

    describe('toggles', () => {      
        test('toggle to start', () => {        
            act(() => {
                timer.current.toggle();
                tick(1);
            });
            
            expect(timer.current.timeLeft).toBe(initialDuration - 1);
        });

        test('toggle start to pause', () => {        
            act(() => {
                timer.current.toggle();
                tick(1);
                timer.current.toggle();
                tick(1);
    
            });
            
            expect(timer.current.timeLeft).toBe(initialDuration - 1);
        });
    });


    
    
    describe('duration changes while paused', () => {        
        test('changes duration before start', () => {
            act(() => {
                timer.current.setTimerDuration(higherDuration);
                timer.current.start();
            });
            
            expect(timer.current.timeLeft).toBe(higherDuration);
        });

        test('changes duration after pause', () => {
            act(() => {
                timer.current.start();
                tick();
                timer.current.pause();
                timer.current.setTimerDuration(higherDuration);
                timer.current.start();
                tick();
            });
            
            expect(timer.current.timeLeft).toBe(higherDuration - 2);
        });

        test('won\'t decrement below 0 after duration decrease', () => {
            act(() => {
                timer.current.start();
                timer.current.pause();
                timer.current.setTimerDuration(lowerDuration);
                timer.current.start();
                tick(lowerDuration + 1);
            });
            
            expect(timer.current.timeLeft).toBe(0);
        });

        
    });

    describe('duration increases while running', () => {
        test('changes duration after start', () => {
            
            act(() => {
                timer.current.start();
                timer.current.setTimerDuration(higherDuration);
            });
            
            expect(timer.current.timeLeft).toBe(higherDuration);
        });

        test('changes duration after 1s', () => {
            act(() => {
                timer.current.start();
                tick();
                timer.current.setTimerDuration(higherDuration);
                tick();
            });
            
            expect(timer.current.timeLeft).toBe(higherDuration - 2);
        });

        test('won\'t decrement below 0 after duration decrease', () => {
            act(() => {
                timer.current.start();
                tick();
                timer.current.setTimerDuration(lowerDuration);
                tick(lowerDuration + 1);
            });
            
            expect(timer.current.timeLeft).toBe(0);
        });
    });

    describe('display seconds and minutes', () => {
        test.each`
        time   | expectedMinutes | expectedSeconds
        ${0}     ${0}              ${0}
        ${1}     ${0}              ${1}
        ${59}    ${0}              ${59}
        ${60}    ${1}              ${0}
        ${61}    ${1}              ${1}
        ${119}   ${1}              ${59}
        ${120}   ${2}              ${0}
        `('$time as $expectedMinutes minutes and $expectedSeconds seconds', ({time, expectedMinutes, expectedSeconds}) => {
            act(() => {
                timer.current.reset(time);
            });
            
            expect(timer.current.minutes).toBe(expectedMinutes);
            expect(timer.current.seconds).toBe(expectedSeconds);
        });
    });

    test('reducer defaults to no state change', () => {
        const expected = 'expected';
        const action = {type: undefined, newDuration: undefined};
        expect(reducer(expected, action)).toBe(expected);
    });
    

});