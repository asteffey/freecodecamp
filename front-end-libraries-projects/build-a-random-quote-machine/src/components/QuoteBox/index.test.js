import React from 'react';

import RouteToQuoteBox from './RouteToQuoteBox';
import { createMyStore } from '../../store';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, fireEvent, wait } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

const createMockStore = configureMockStore([thunk]);

describe('QuoteBox App', () => {
    const quoteText = 'some quote text';
    const quoteAuthor = 'some quote author';

    const createMockLoadedStore = () => createMockStore({
        quote: {
            text: quoteText,
            author: quoteAuthor
        },
        status: {
            hasError: false,
            isLoading: false
        },
        nextId: 2222,
        cancel: null
    });

    const renderQuoteBox = (store = createMockLoadedStore()) => {
        return render(<Provider store={store}><Router><RouteToQuoteBox /></Router></Provider>);
    };

    const fetchMock = jest.spyOn(global, 'fetch');
    
    beforeEach(() => {
        fetchMock.mockReturnValueOnce(Promise.resolve({
            json: () => Promise.resolve({
                quote: quoteText,
                author: quoteAuthor
            })
        }));
    });

    afterEach(() => {
        fetchMock.mockClear();
    });

    // 1. I can see a wrapper element with a corresponding id="quote-box".
    it('creates #quote-box element', () => {
        const { container } = renderQuoteBox();
        const quoteBox = container.querySelector('#quote-box');
        expect(quoteBox).toBeInTheDocument();
    });

    // 2. Within #quote-box, I can see an element with corresponding id="text".
    it('has #text element', () => {
        const { container } = renderQuoteBox();
        const text = container.querySelector('#quote-box #text');
        expect(text).toBeInTheDocument();
    });

    // 3. Within #quote-box, I can see an element with corresponding id="author".
    it('has #author element', () => {
        //setupAsLoaded();
        const { container } = renderQuoteBox();
        const author = container.querySelector('#quote-box #author');
        expect(author).toBeInTheDocument();
    });

    // 4. Within #quote-box, I can see a clickable element with corresponding id="new-quote".
    it('has a#new-quote element', () => {
        const { container } = renderQuoteBox();
        const newQuoteLink = container.querySelector('#quote-box a#new-quote');
        expect(newQuoteLink).toBeInTheDocument();
    });

    // 5. Within #quote-box, I can see a clickable <a> element with corresponding id="tweet-quote".
    it('has a#tweet-quote element', () => {
        const { container } = renderQuoteBox();
        const tweetQuoteLink = container.querySelector('#quote-box a#tweet-quote');
        expect(tweetQuoteLink).toBeInTheDocument();
    });

    // 6. On first load, my quote machine displays a random quote in the element with id="text".
    // 7. On first load, my quote machine displays the random quote's author in the element with id="author".
    it('displays random quote on first load', async () => {
        const { container } = renderQuoteBox(createMyStore());

        await wait(() => container.querySelector('#text'));

        const text = container.querySelector('#quote-box #text');
        expect(text.textContent).toBe(quoteText);

        const author = container.querySelector('#quote-box #author');
        expect(author.textContent).toBe(quoteAuthor);
    });

    // 8. When the #new-quote button is clicked, my quote machine should fetch a new quote and display it in the #text element.
    // 9. My quote machine should fetch the new quote's author when the #new-quote button is clicked and display it in the #author element.
    it('displays new quote when a#new-quote is clicked', async () => {
        const anotherQuote = 'another quote text';
        const anotherQuoteAuthor = 'another quote author';
        fetchMock.mockReturnValueOnce(Promise.resolve({
            json: () => Promise.resolve({
                quote: anotherQuote,
                author: anotherQuoteAuthor
            })
        }));

        const { container } = renderQuoteBox(createMyStore());

        await wait(() => container.querySelector('#text'));

        const newQuoteLink = container.querySelector('#quote-box a#new-quote');
        fireEvent.click(newQuoteLink);

        await wait(() => container.querySelector('#text'));
        
        const text = container.querySelector('#quote-box #text');
        expect(text.textContent).toBe(anotherQuote);

        const author = container.querySelector('#quote-box #author');
        expect(author.textContent).toBe(anotherQuoteAuthor);
    });

    // 10. I can tweet the current quote by clicking on the #tweet-quote <a> element. This <a> element should include the "twitter.com/intent/tweet" path in it's href attribute to tweet the current quote.
    it('can tweet current quote', () => {
        const { container } = renderQuoteBox();
        const tweetQuoteLink = container.querySelector('#quote-box a#tweet-quote');
        const href = tweetQuoteLink.getAttribute('href');

        expect(href).toContain('https://twitter.com/intent/tweet');
        expect(href).toContain(encodeURI(quoteText));
        expect(href).toContain(encodeURI(quoteAuthor));
    });

});