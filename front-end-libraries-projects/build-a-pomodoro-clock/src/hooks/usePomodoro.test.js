import { renderHook, act, cleanup} from '@testing-library/react-hooks';
import usePomodoro from './usePomodoro';

function tick(ticks) {
    ticks = typeof ticks === 'undefined' ? 1 : ticks;
    jest.advanceTimersByTime(ticks * 1000);
}

function mockPromise() {
    let resolvePromise;
    const promise = new Promise((resolve) => {
        resolvePromise = resolve;
    });

    return {
        promise,
        getPromise: () => promise,
        resolvePromise
    };
}

describe('usePomodoro', () => {
    jest.useFakeTimers();

    let mockedPromise, renderedUsePomodoro;

    beforeEach(() => {
        mockedPromise = mockPromise();
        renderedUsePomodoro = renderHook(() => usePomodoro(mockedPromise.getPromise));
    });

    afterEach(() => {
        act(() => renderedUsePomodoro.result.current.reset());
        cleanup();
    });

    describe.each`
    lengthType
    ${'breakLength'}
    ${'sessionLength'}
    `('$lengthType', ({ lengthType }) => {

        test('sets', () => {
            const { result } = renderedUsePomodoro;
            const newLength = result.current[lengthType].min;
            act(() => {
                result.current[lengthType].set(newLength);
            });

            expect(result.current[lengthType].current).toBe(newLength);
        });

        test('functionally sets', () => {
            const { result } = renderedUsePomodoro;
            const newLength = result.current[lengthType].min;
            act(() => {
                result.current[lengthType].set(() => newLength);
            });

            expect(result.current[lengthType].current).toBe(newLength);
        });

        test('won\t set below min', () => {
            const { result } = renderedUsePomodoro;
            const tooLow = result.current[lengthType].min - 1;
            act(() => {
                result.current[lengthType].set(tooLow);
            });
            

            expect(result.current[lengthType].current).toBe(result.current[lengthType].default);
        });

        test('won\t set too low', () => {
            const { result } = renderedUsePomodoro;
            const tooHigh = result.current[lengthType].max + 1;
            act(() => {
                result.current[lengthType].set(tooHigh);
            });

            expect(result.current[lengthType].current).toBe(result.current[lengthType].default);
        });
    });

    describe('defaults', () => {
        test('displays default display time', () => {
            const { result } = renderedUsePomodoro;
            expect(result.current.displayTime).toBe('25:00');
        });
    
        test('displays default status', () => {
            const { result } = renderedUsePomodoro;
            expect(result.current.status).toBe('Session');
        });
    });

    describe('resets', () => {
        test('reset when paused', () => {
            const { result } = renderedUsePomodoro;
            act(() => result.current.reset());
            
            expect(result.current.displayTime).toBe('25:00');
            expect(result.current.status).toBe('Session');
            expect(result.current.breakLength.current).toBe(result.current.breakLength.default);
            expect(result.current.sessionLength.current).toBe(result.current.sessionLength.default);
        });

        test('reset when running', () => {
            const { result } = renderedUsePomodoro;
            act(() => {
                result.current.toggle();
                tick();
                result.current.reset();
            });
            
            expect(result.current.displayTime).toBe('25:00');
            expect(result.current.status).toBe('Session');
            expect(result.current.breakLength.current).toBe(result.current.breakLength.default);
            expect(result.current.sessionLength.current).toBe(result.current.sessionLength.default);
        });
    });

    describe('displays time correctly', () => {
        test.each`
        ticks      | expectedDisplayTime
        ${0}       | ${'25:00'}
        ${1}       | ${'24:59'}
        ${59}      | ${'24:01'}
        ${60}      | ${'24:00'}
        ${60*25}   | ${'00:00'}
        ${60*25+1} | ${'00:00'}
        `('displays $ticks as $expectedDisplayTime', ({ticks, expectedDisplayTime}) => {
            const { result } = renderedUsePomodoro;
            act(() => {
                result.current.toggle();
                tick(ticks);
            });
            
            expect(result.current.displayTime).toBe(expectedDisplayTime);
        });
    });

    test('changes to Break after Session', async () => {
        const { resolvePromise } = mockedPromise;
        const { result, waitForNextUpdate } = renderedUsePomodoro;
        act(() => {
            result.current.toggle();
            tick(60 * 25);
            resolvePromise();
        });
        await waitForNextUpdate();

        expect(result.current.status).toBe('Break');
        expect(result.current.displayTime).toBe('05:00');
    });

    test('changes to Session after Break', async () => {
        const { resolvePromise } = mockedPromise;
        const { result, waitForNextUpdate } = renderedUsePomodoro;
        act(() => {
            result.current.toggle();
            tick(60 * 25);
            resolvePromise();
        });
        await waitForNextUpdate();

        act(() => {
            tick(60 * 5);
            resolvePromise();
        });
        await waitForNextUpdate();

        expect(result.current.status).toBe('Session');
        expect(result.current.displayTime).toBe('25:00');
    });
});