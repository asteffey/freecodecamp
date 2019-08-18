import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QuoteBox from './QuoteBox';

import useFetchQuote from '../../hooks/useFetchQuote';

jest.mock('./Quote', () => () => <div id="Quote"/>);
jest.mock('./NewQuoteButton', () => () => <div id="NewQuoteButton"/>);
jest.mock('../TweetButton', () => () => <div id="TweetButton"/>);
jest.mock('../../hooks/useFetchQuote');

describe('QuoteBox', () => {
    const testId = 1234;

    afterEach(() => {
        useFetchQuote.mockClear();
    })
  
    it('matches snapshot', () => {
        const { container } = render(<QuoteBox id={testId} />);
        expect(container).toMatchSnapshot();
    });

    it('creates #quote-box element', () => {
        const { container } = render(<QuoteBox id={testId} />);
        const quoteBox = container.querySelector('#quote-box');
        expect(quoteBox).toBeInTheDocument();
    });

    it('contains Quote', () => {
        const { container } = render(<QuoteBox id={testId} />);
        const Quote = container.querySelector('#Quote');
        expect(Quote).toBeInTheDocument();
    });

    it('contains NewQuoteButton', () => {
        const { container } = render(<QuoteBox id={testId} />);
        const NewQuoteButton = container.querySelector('#NewQuoteButton');
        expect(NewQuoteButton).toBeInTheDocument();
    });

    it('contains TweetButton', () => {
        const { container } = render(<QuoteBox id={testId} />);
        const TweetButton = container.querySelector('#TweetButton');
        expect(TweetButton).toBeInTheDocument();
    });

    it('fetches quote', () => {
        render(<QuoteBox id={testId} />);
        expect(useFetchQuote.mock.calls.length).toBe(1);
        expect(useFetchQuote.mock.calls[0][0]).toBe(testId);
    });


});