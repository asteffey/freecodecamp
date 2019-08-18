import React from 'react';
import { render } from '@testing-library/react';
import TweetButton from './TweetButton';

describe('The TweetButton component', () => {
    test('creates a#tweet-quote', () => {
        const { container } = render(<TweetButton/>);
        const link = container.querySelector('a#tweet-quote');
        expect(link).toBeDefined();
    });

    test('a#tweet-quote posts to twitter', () => {
        const { container } = render(<TweetButton/>);
        const link = container.querySelector('a#tweet-quote');
        expect(link.getAttribute('href').includes('https://twitter.com/intent/tweet')).toBe(true);
    });

});